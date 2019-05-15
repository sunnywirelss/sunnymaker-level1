from machine import Pin, I2C
import framebuf
from micropython import const
from ESP32 import *

_DISPLAY_BLINK_CMD = 0x80
_DISPLAY_BLINK_DISPLAYON = 0x01
_DISPLAY_CMD_BRIGHTNESS = 0xE0
_DISPLAY_OSCILATOR_ON = 0x21

class Image:
    def __init__(self,str=""):
        self.str=str

    def __add__(self,other):
        img = Image()
        l1 = self.str.split(':')
        l2 = other.str.split(':')
        l = []
        s = ""
        for i in range(8):
            for j in range(16):
                if l2[i][j]>l1[i][j]:
                    s += l2[i][j]
                else:
                    s += l1[i][j]
            l.append(s)
            s = ""
        img.str = ":".join(l)
        #print(img.str)
        #self.str = ":".join(l1)
        return img

    def __sub__(self,other):
        img = Image()
        l1 = self.str.split(':')
        # print(l1)
        l2 = other.str.split(':')
        # print(l2)
        l = []
        s = ""
        for i in range(8):
            for j in range(16):
                if l2[i][j]=='1' and l1[i][j]=='1':
                    s += '0'
                    # print(1)
                else:
                    s += l1[i][j]
            l.append(s)
            s = ""
        img.str = ":".join(l)
        # print(img.str)
        #self.str = ":".join(l1)
        return img

class Display:
    """The base class for all Display-based backpacks and wings."""
    WIDTH = 16
    HEIGHT = 8
    FORMAT = framebuf.MONO_HMSB
    FB_BPP = 1

    def __init__(self, i2c, address=0x70):
        # self.i2c = i2c
        # self.address = address
        # self._temp = bytearray(1)
        # self.buffer = bytearray(17)
        # #self.buffer[0] = 0x00
        # self.framebuf = framebuf.FrameBuffer(self.buffer, 16, 8, framebuf.MONO_HMSB)
        # self.fill(0)
        # self._write_cmd(_DISPLAY_OSCILATOR_ON)
        # self.blink_rate(0)
        # self.brightness(15)
        self.i2c = i2c
        self.address = address
        self._temp = bytearray(1)
        self.buffer = bytearray(16)
        self.buffer2 = bytearray(17)
        self.buffer2[0] = 0x00
        self._write_cmd(_DISPLAY_OSCILATOR_ON)
        self.blink_rate(0)
        self.brightness(5)
        self._fb_buffer = bytearray(self.WIDTH*self.HEIGHT*self.FB_BPP // 8)
        self.framebuf = framebuf.FrameBuffer(self._fb_buffer, self.WIDTH, self.HEIGHT, self.FORMAT)
        self.framebuf.fill(0)
        self._pixel = self.framebuf.pixel
        self.fill = self.framebuf.fill

    def _write_cmd(self, byte):
        """Send a command."""
        self._temp[0] = byte
        self.i2c.writeto(self.address, self._temp)

    def blink_rate(self, rate=None):
        """Get or set the blink rate."""
        if rate is None:
            return self._blink_rate
        rate = rate & 0x02
        self._blink_rate = rate
        self._write_cmd(_DISPLAY_BLINK_CMD |
                        _DISPLAY_BLINK_DISPLAYON | rate << 1)

    def brightness(self, brightness):
        """Get or set the brightness."""
        if brightness is None:
            return self._brightness
        brightness = brightness & 0x0F
        self._brightness = brightness
        self._write_cmd(_DISPLAY_CMD_BRIGHTNESS | brightness)

    def _copy_buf(self):
        for y in range(16):
            self.buffer[y] = self._fb_buffer[y]
            # print("self.buffer[{}]: {}".format(y,self.buffer[y]))
        # for x in range(8):
        #     self.buffer[x] = self._fb_buffer[7-x]
    
    def _show(self):
        self._copy_buf()
        i2c.writeto_mem(self.address, 0x00, self.buffer)

    # def _show(self):
    #     """Actually send all the changes to the device."""
    #     self.i2c.writeto(self.address, self.buffer)

    def fill(self, color):
        """Fill the display with given color."""
        fill = 0xff if color else 0x00
        for i in range(16):
            self.buffer[i + 1] = fill

    def text(self,string,x,y):
        self.framebuf.text(string,x,y,1)

    def show(self, data, time=400):
        self.fill(0)
        if type(data)==str:
            # print("str")
            for s in data:
                print(s)
                self.fill(0)
                self.text(s,4,0)
                self._show()
                sleep(time)
        elif type(data)==int:
            pass
        elif type(data)==type(Image.HEART):
            # print("Image")
            l = data.str.split(':')
            for i in range(8):
                for j in range(16):
                    if l[i][j] == '1':
                        self._pixel(j, i, 1)
                    else:
                        self._pixel(j, i, 0)
                    #print(l[i][j])
            self._show()

    def scroll(self, data, time=50):
        num = -len(data)*8
        for i in range(15,num,-1):
            display.fill(0)
            display.text(data,i,0)
            sleep(time)
            display._show()

    def rect(self, x, y, w, h, c):
        self.fill(0)
        self.framebuf.rect(x, y, w, h, c)
        self._show()

    def line(self,x1,x2,y1,y2,c):
        self.fill(0)
        self.framebuf.line(x1,x2,y1,y2,c)
        self._show()

    def _pixel(self, x, y, color=None):
        """Set a single pixel in the frame buffer to specified color."""
        mask = 1 << x
        if color is None:
            return bool((self.buffer[y + 1] | self.buffer[y + 2] << 8) & mask)
        if color:
            self.buffer[y * 2 + 1] |= mask & 0xff
            self.buffer[y * 2 + 2] |= mask >> 8
        else:
            self.buffer[y * 2 + 1] &= ~(mask & 0xff)
            self.buffer[y * 2 + 2] &= ~(mask >> 8)

    def set_pixel(self, x, y, flag):
       #print(x,y,z)
        self._pixel(x, y, flag)
        self._show()

    def get_pixel(self, x, y):
       #print(x,y,z)
        return self._pixel(x, y)
            
    def clear(self):
        self.fill(0)
        self._show()

    def set_brightness(self, brightness):
        self.brightness(brightness)
        self._show()
    
    def get_brightness(self):
        return self.brightness(None)
        
class BitmapFont:
    def __init__(self, width, height, pixel, font_name='font5x8.bin'):
        self._width = width
        self._height = height
        self._pixel = pixel
        self._font_name = font_name

    def init(self):
        # Open the font file and grab the character width and height values.
        # Note that only fonts up to 8 pixels tall are currently supported.
        self._font = open(self._font_name, 'rb')
        self._font_width, self._font_height = ustruct.unpack('BB', self._font.read(2))

    def deinit(self):
        self._font.close()
    def __enter__(self):
        self.init()
        return self

    def __exit__(self, exception_type, exception_value, traceback):
        self.deinit()

    def draw_char(self, ch, x, y, *args, **kwargs):
        # Don't draw the character if it will be clipped off the visible area.
        if x < -self._font_width or x >= self._width or \
           y < -self._font_height or y >= self._height:
            return
        # Go through each column of the character.
        for char_x in range(self._font_width):
            # Grab the byte for the current column of font data.
            self._font.seek(2 + (ord(ch) * self._font_width) + char_x)
            line = ustruct.unpack('B', self._font.read(1))[0]
            # Go through each row in the column byte.
            for char_y in range(self._font_height):
                # Draw a pixel for each bit that's flipped on.
                if (line >> char_y) & 0x1:
                    self._pixel(x + char_x, y + char_y, *args, **kwargs)

    def text(self, text, x, y, *args, **kwargs):
        # Draw the specified text at the specified location.
        for i in range(len(text)):
            self.draw_char(text[i], x + (i * (self._font_width + 1)), y,
                           *args, **kwargs)

    def width(self, text):
        # Return the pixel width of the specified text message.
        return len(text) * (self._font_width + 1)

i2c = I2C(scl=Pin(22), sda=Pin(21), freq=100000)
display = Display(i2c)
display.clear()
#Image.MHT = const(Image("1111111111111111:0010000100000100:0000000000000000:0000000000000000:0000000000000000:0000000000000000:0000000000000000:0000000000000000"))
#Image.LQY = const(Image("0000000000000000:1111111111111111:0000000000000000:0000000000000000:0000000000000000:0000000000000000:0000000000000000:0000000000000000"))
# Image.HEART=Image('0000010001000000:0000101010100000:0001000100010000:0001000000010000:0000100000100000:0000010001000000:0000001010000000:0000000100000000')
# Image.HEART_SMALL=Image('0000000000000000:0000000000000000:0000001010000000:0000010101000000:0000010001000000:0000001010000000:0000000100000000:0000000000000000')
Image.HEART=Image('0000010001000000:0000111011100000:0001111111110000:0001111111110000:0000111111100000:0000011111000000:0000001110000000:0000000100000000')
Image.HEART_SMALL=Image('0000000000000000:0000010001000000:0000111011100000:0000111111100000:0000011111000000:0000001110000000:0000000100000000:0000000000000000')
Image.HAPPY=Image('0000000000000000:0000000000000000:0001100000011000:0001100000011000:0000000000000000:0000010000100000:0000001001000000:0000000110000000')
Image.SAD=Image('0000000000000000:0000000000000000:0001110000111000:0010000000000100:0000000000000000:0000000110000000:0000001001000000:0000010000100000')
Image.SMILE=Image('0000000000000000:0001100000011000:0010010000100100:0000000000000000:0000000000000000:0000010000100000:0000001001000000:0000000110000000')
Image.SILLY=Image('0000000000000000:0001100000011000:0010010000100100:0001100000011000:0000000000000000:0000001111000000:0000001001000000:0000000110000000')
Image.FABULOUS=Image('0001110000111000:0010001001000100:0011111001111100:0000000000000000:0000000000000000:0000011111100000:0000010000100000:0000001111000000')
Image.SURPRISED=Image('0000000000000000:0000000100000000:0000000100000000:0000000100000000:0000000100000000:0000000100000000:0000000000000000:0000000100000000')
Image.ASLEEP=Image('0000000000000000:0000000000000000:0011110000111100:0000000000000000:0000000000000000:0000001111000000:0000010000100000:0000001111000000')
Image.ANGRY=Image('0010001001000100:0001010000101000:0000100000010000:0000000000000000:0000000110000000:0000001001000000:0000010000100000:0000100000010000')
Image.CONFUSED=Image('0000000000000000:0000001110000000:0000010001000000:0000000001000000:0000000010000000:0000000100000000:0000000000000000:0000000100000000')
Image.NO=Image('0000000000000000:0000100001000000:0000010010000000:0000001100000000:0000001100000000:0000010010000000:0000100001000000:0000000000000000')
Image.YES=Image('000000000000000:000000000001000:0000000000010000:0000000000100000:0000100001000000:0000010010000000:0000001100000000:0000000000000000')
Image.LEFT_ARROW=Image('0000000000000000:0000010000000000:0000100000000000:0001000000000000:0010111111111100:0001000000000000:0000100000000000:0000010000000000')
Image.RIGHT_ARROW=Image('0000000000000000:0000000000100000:0000000000010000:0000000000001000:0011111111110100:0000000000001000:0000000000010000:0000000000100000')
Image.DRESS=Image('0000010001000000:0000111111100000:0000011011000000:0000001110000000:0000010101000000:0000101010100000:0001010101010000:0000111111100000')
Image.TRANSFORMERS=Image('0000000000000000:0000000100000000:0000011011000000:0000010101000000:0000010101000000:0000001010000000:000010001000000:0000010001000000')
Image.SCISSORS=Image('0000010000010000:0000011000110000:0000001101100000:0000000111000000:0000000010000000:0000001101100000:0000010101010000:0000001000100000')
Image.EXIT=Image('0000000000110000:0000000011100000:0000000101110000:0000001001001100:0000000010100000:0000001010010000:000000010001000:0000000000000100')
Image.TREE=Image('0000000100000000:0000001110000000:0000011111000000:0000111111100000:0001111111110000:0000000100000000:000000100000000:0000000100000000')
Image.PACMAN=Image('0000111111000000:0001100000100000:0011001001000000:0010000010000000:0011000001000000:0001100000100000:0000111111000000:0000000000000000')
Image.TARGET=Image('0000000000000000:0000000000000000:0000000111000000:0000001000100000:0000001010100000:0000001000100000:0000000111000000:000000000000000')
Image.TSHIRT=Image('0000010000100000:0000101111010000:0001000000001000:0000110000110000:0000010000100000:0000010000100000:0000010000100000:0000011111100000')
Image.ROLLERSKATE=Image('0000111100000000:0000100100000000:0000100111100000:0000100000010000:0000111111110000:0001010000101000:0001110000111000:0000000000000000')
Image.DUCK=Image('0000011100000000:0000100110000000:0001000010000000:0011110010000000:0000010011111110:0000010000000100:0000010000001000:000011111110000')
Image.HOUSE=Image('0011111111111100:0110000000000110:1100000000000011:0010011111100100:001001000100100:0010010100100100:001001000100100:0010010000100100')
Image.TORTOISE=Image('0000000110000000:0000010110100000:0000011111100000:0000011111100000:0000011111100000:0000001111000000:0000010000100000:000000000000000')
Image.BUTTERFLY=Image('0000000000000000:0000011000110000:0000100101001000:0000011111110000:0000000111000000:0000001010100000:0000010101010000:0000011000110000')
Image.STICKFIGURE=Image('0000000100000000:0000001010000000:0000000100000000:0000001110000000:0000010101000000:0000000100000000:0000001010000000:000010001000000')
Image.GHOST=Image('0000011111000000:0000110101100000:0000110101100000:0000111111100000:0000110101100000:0000101010100000:0000111111110000:0000111111111000')
Image.PITCHFORK=Image('0000000000011111:0000000000100000:0000000000100000:1111111111111111:0000000000100000:0000000000100000:0000000000011111:0000000000000000')
Image.MUSIC_QUAVERS=Image('0000000000000000:0000000000000000:0001100001100001:0011110011110010:0100111100111100:1000011000011000:0000000000000000:0000000000000000')
Image.MUSIC_QUAVER=Image('0111111100000000:1000000010000000:1111111111110000:0000000001111000:0000000011111100:0000000011111100:0000000001111100:0000000000111000')
Image.MUSIC_CROTCHET=Image('0000000000000000:1111111111110000:0000000001111000:0000000011111100:0000000011111100:0000000001111100:0000000000111000:0000000000000000')
Image.COW=Image('0001000000000000:0111100000000000:0101111111100000:0111111111110000:0111111111101100:0000110001100010:0000110001100000:0000110001100000')
Image.RABBIT=Image('0000001111111100:0111111000000010:1000000010001010:0111110000111010:1000000010001010:0111111000000010:0000001111111100:0000000000000000')
Image.SQUARE_SMALL=Image('0000000000000000:0000000000000000:0000001111000000:0000001001000000:0000001001000000:0000001111000000:0000000000000000:0000000000000000')
Image.SQUARE=Image('0000111111110000:0000100000010000:0000100000010000:0000100000010000:0000100000010000:0000100000010000:0000100000010000:0000111111110000')
Image.DIAMOND_SMALL=Image('0000000000000000:0000000000000000:0000001110000000:0000010101000000:0000001010000000:0000000100000000:0000000000000000:0000000000000000')
Image.DIAMOND=Image('0000111111100000:0001101010110000:0011011111011000:0001101110110000:0000110101100000:0000011011000000:0000001110000000:0000000100000000')
Image.CHESSBOARD=Image('0000000000000000:0001111111111100:0001010101010100:0001111111111100:0001010101010100:0001111111111100:0001010101010100:0001111111111100')
Image.TRIANGLE_LEFT=Image('0000000000000000:0000000010000000:0000000110000000:0000001110000000:0000011110000000:0000001110000000:0000000110000000:0000000010000000')
Image.TRIANGLE=Image('000000000000000:000000110000000:0000001111000000:0000011111100000:0000111111110000:0001111111111000:0011111111111100:0000000000000000')
Image.SNAKE=Image('0000000001110000:0000000001010000:0000000001110000:0000111111000000:0001111111000000:0011100000000000:0111000000000000:0000000000000000')
Image.UMBRELLA=Image('0000000100000000:0000011111000000:0000111111100000:0001111111110000:0000000100000000:0000000100000000:0000000101000000:0000000111000000')
Image.SKULL=Image('0000011111000000:0000100100100000:0001000100010000:0001111011110000:0000111111100000:0000010001000000:0000010101000000:0000001110000000')
Image.GIRAFFE=Image('0000000110000000:0000000111000000:0000000100000000:0000000100000000:0000000100000000:0000111100000000:0000100100000000:0000100100000000')
Image.SWORD=Image('0000000000000000:0000100000000000:0000110000000000:0011111111111000:0011111111111000:0000110000000000:0000100000000000:0000000000000000')
Image.MHT=Image('1000101001011111:1101101001000100:1010101001000100:1000101111000100:1000101001000100:1000101001000100:1000101001000100:1000101001000100')
Image.LQY=Image('1000001110010001:1000010001010001:1000010001001010:1000010001000100:1000010001000100:1000010001000100:1000001111000100:1111000000100100')
Image.LPF=Image('1000011110011111:1000010001010000:1000010001010000:1000011110011111:1000010000010000:1000010000010000:1000010000010000:1111010000010000')
Image.XBC=Image('1000101111000110:1000101000101001:0101001000101000:0010001111001000:0010001000101000:0101001000101000:1000101000101001:1000101111000110')
Image.FQ=Image('1111111001111100:1000000010000010:1000000010000010:1111111010000010:1000000010000010:1000000010001010:1000000010000110:1000000001111101')
Image.LXY=Image('1000010001010001:1000010001010001:1000001010001010:1000000100000100:1000000100000100:1000001010000100:1000010001000100:1111010001000100')