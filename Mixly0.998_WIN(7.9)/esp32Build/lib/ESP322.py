import framebuf
from machine import Pin
from machine import PWM
from machine import ADC
from machine import I2C
from machine import SPI
from machine import TouchPad
from machine import UART
from micropython import const
import esp
import framebuf
import machine
import sys
import time


_DISPLAY_BLINK_CMD = 0x80
_DISPLAY_BLINK_DISPLAYON = 0x01
_DISPLAY_CMD_BRIGHTNESS = 0xE0
_DISPLAY_OSCILATOR_ON = 0x21

SET_CONTRAST        = const(0x81)
SET_ENTIRE_ON       = const(0xa4)
SET_NORM_INV        = const(0xa6)
SET_DISP            = const(0xae)
SET_MEM_ADDR        = const(0x20)
SET_COL_ADDR        = const(0x21)
SET_PAGE_ADDR       = const(0x22)
SET_DISP_START_LINE = const(0x40)
SET_SEG_REMAP       = const(0xa0)
SET_MUX_RATIO       = const(0xa8)
SET_COM_OUT_DIR     = const(0xc0)
SET_DISP_OFFSET     = const(0xd3)
SET_COM_PIN_CFG     = const(0xda)
SET_DISP_CLK_DIV    = const(0xd5)
SET_PRECHARGE       = const(0xd9)
SET_VCOM_DESEL      = const(0xdb)
SET_CHARGE_PUMP     = const(0x8d)

def sleep(time_ms):
    return time.sleep_ms(time_ms)

def sleep_s(time_s):
    return time.sleep(time_s)

def sleep_us(time_us):
    return time.sleep_us(time_us)

def running_time(time_ms):
    return time.ticks_ms(time_ms)

def running_time_us(time_us):
    return time.ticks_us(time_us)

#dht
buf = bytearray(5)
_dht_time = 0

def measure(pin):
    global _dht_time
    if(time.ticks_diff(time.ticks_ms(), _dht_time))>1000:
        global buf
        esp.dht_readinto(pin, buf)
        if(buf[0]+buf[1]+buf[2]+buf[3])&0xff!= buf[4]:
            raise Exception("checksum error")
        _dht_time = time.ticks_ms()    

def get_temperature(pin):
    measure(pin)
    return buf[2]

def get_humidity(pin):
    measure(pin)
    return buf[0]    

def get_all(pin):
    measure(pin)
    return (buf[0],buf[2])    

class MyPin(Pin):
    def write_digital(self,val):
        self.init(Pin.OUT)
        self.value(val)

    def read_digital(self):
        self.init(Pin.IN)
        return self.value()

    def write_analog(self,val):
        id = int(str(self)[4:-1]) #unsafe!
        self = PWM(Pin(id),duty=val)     

    def read_analog(self):
        id = int(str(self)[4:-1]) #unsafe!
        self = ADC(Pin(id))
        return self.read()

    def set_frequency(self,val):
        id = int(str(self)[4:-1])
        self = PWM(Pin(id),freq=val)

    def is_touched(self):
        id = int(str(self)[4:-1]) #unsafe!
        return TouchPad(Pin(id)).read() < 500


currentBoard=""
if(sys.platform=="esp8266"):
  currentBoard="esp8266"
elif(sys.platform=="esp32"):
  currentBoard="esp32"
elif(sys.platform=="pyboard"):
  currentBoard="pyboard"


class SSD1306:
  def __init__(self, width, height, external_vcc):
    self.width = width
    self.height = height
    self.external_vcc = external_vcc
    self.pages = self.height // 8
    self.buffer = bytearray(self.pages * self.width)
    self.framebuf = framebuf.FrameBuffer(self.buffer, self.width, self.height, framebuf.MVLSB)
    self.poweron()
    self.init_display()

  def init_display(self):
    for cmd in (
      SET_DISP | 0x00, # off
      SET_MEM_ADDR, 0x00, # horizontal
      SET_DISP_START_LINE | 0x00,
      SET_SEG_REMAP | 0x01,
      SET_MUX_RATIO, self.height - 1,
      SET_COM_OUT_DIR | 0x08,
      SET_DISP_OFFSET, 0x00,
      SET_COM_PIN_CFG, 0x02 if self.height == 32 else 0x12,
      SET_DISP_CLK_DIV, 0x80,
      SET_PRECHARGE, 0x22 if self.external_vcc else 0xf1,
      SET_VCOM_DESEL, 0x30, # 0.83*Vcc
      SET_CONTRAST, 0xff,
      SET_ENTIRE_ON,
      SET_NORM_INV,
      SET_CHARGE_PUMP, 0x10 if self.external_vcc else 0x14,
      SET_DISP | 0x01):
      self.write_cmd(cmd)
    self.fill(0)
    self.show()

  def poweroff(self):
    self.write_cmd(SET_DISP | 0x00)

  def contrast(self, contrast):
    self.write_cmd(SET_CONTRAST)
    self.write_cmd(contrast)

  def invert(self, invert):
    self.write_cmd(SET_NORM_INV | (invert & 1))

  def show(self):
    x0 = 0
    x1 = self.width - 1
    if self.width == 64:
      x0 += 32
      x1 += 32
    self.write_cmd(SET_COL_ADDR)
    self.write_cmd(x0)
    self.write_cmd(x1)
    self.write_cmd(SET_PAGE_ADDR)
    self.write_cmd(0)
    self.write_cmd(self.pages - 1)
    self.write_data(self.buffer)

  def fill(self, col):
    self.framebuf.fill(col)

  def pixel(self, x, y, col):
    self.framebuf.pixel(x, y, col)

  def scroll(self, dx, dy):
    self.framebuf.scroll(dx, dy)

  def text(self, string, x, y, col=1):
    self.framebuf.text(string, x, y, col)

  def hline(self, x, y, w, col):
    self.framebuf.hline(x, y, w, col)

  def vline(self, x, y, h, col):
    self.framebuf.vline(x, y, h, col)

  def line(self, x1, y1, x2, y2, col):
    self.framebuf.line(x1, y1, x2, y2, col)

  def rect(self, x, y, w, h, col):
    self.framebuf.rect(x, y, w, h, col)

  def fill_rect(self, x, y, w, h, col):
    self.framebuf.fill_rect(x, y, w, h, col)

  def blit(self, fbuf, x, y):
    self.framebuf.blit(fbuf, x, y)

class SSD1306_I2C(SSD1306):
  def __init__(self, width, height, i2c, addr=0x3c, external_vcc=False):
    self.i2c = i2c
    self.addr = addr
    self.temp = bytearray(2)
    super().__init__(width, height, external_vcc)

  def write_cmd(self, cmd):
    self.temp[0] = 0x80 # Co=1, D/C#=0
    self.temp[1] = cmd
    global currentBoard
    if currentBoard=="esp8266" or currentBoard=="esp32":
      self.i2c.writeto(self.addr, self.temp)
    elif currentBoard=="pyboard":
      self.i2c.send(self.temp,self.addr)

  def write_data(self, buf):
    self.temp[0] = self.addr << 1
    self.temp[1] = 0x40 # Co=0, D/C#=1
    global currentBoard
    if currentBoard=="esp8266" or currentBoard=="esp32":
      self.i2c.start()
      self.i2c.write(self.temp)
      self.i2c.write(buf)
      self.i2c.stop()
    elif currentBoard=="pyboard":
     self.i2c.mem_write(buf,self.addr,0x40)

  def poweron(self):
    pass

  def show_str(self,s1,s2,s3,s4):
    self.text(s1, 0 , 0)
    self.text(s2, 0 , 16)
    self.text(s3, 0 , 32)
    self.text(s4, 0 , 48)
    self.show()

  def show_rect(self,x,y,w,h,b):
    self.rect(x,y,w,h,b)
    self.show()  

  def show_fill_rect(self,x,y,w,h,b):
    self.fill_rect(x,y,w,h,b)
    self.show() 

  def show_vline(self,x,y,h,b):
    self.vline(x,y,h,b)
    self.show()     

  def show_hline(self,x,y,w,b):
    self.hline(x,y,w,b)
    self.show()

  def show_line(self,x,y,x2,y2,b):
    self.line(x,y,x2,y2,b)
    self.show()   

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
        print(img.str)
        #self.str = ":".join(l1)
        return img

    def __sub__(self,other):
        img = Image()
        l1 = self.str.split(':')
        l2 = other.str.split(':')
        l = []
        s = ""
        for i in range(8):
            for j in range(16):
                if l2[i][j]==1 and l1[i][j]==1:
                    s += '0'
                else:
                    s += l1[i][j]
            l.append(s)
            s = ""
        img.str = ":".join(l)
        print(img.str)
        #self.str = ":".join(l1)
        return img

class Display:
    """The base class for all Display-based backpacks and wings."""

    def __init__(self, i2c, address=0x70):
        self.i2c = i2c
        self.address = address
        self._temp = bytearray(1)
        self.buffer = bytearray(16+1)
        #self.buffer[0] = 0x00
        self.framebuf = framebuf.FrameBuffer(self.buffer, 16, 8, framebuf.MONO_HMSB)
        self.fill(0)
        self._write_cmd(_DISPLAY_OSCILATOR_ON)
        self.blink_rate(0)
        self.brightness(15)

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

    def _show(self):
        """Actually send all the changes to the device."""
        self.i2c.writeto(self.address, self.buffer)

    def fill(self, color):
        """Fill the display with given color."""
        fill = 0xff if color else 0x00
        for i in range(16):
            self.buffer[i + 1] = fill

    def text(self, string):
        self.framebuf.text(string,0,0,1)

    def show(self, img):
        self.fill(0)
        l = img.str.split(':')
        for i in range(8):
            for j in range(16):
                if l[i][j] == '1':
                    self._pixel(j, i, 1)
                else:
                    self._pixel(j, i, 0)
                #print(l[i][j])
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

class Sonar:
    def __init__(self, trig, echo):
        self.trig=Pin(trig, Pin.OUT)
        self.echo=Pin(echo, Pin.IN)

    def checkdist(self):
        # trig, echo = Pin(trig, Pin.OUT), Pin(echo, Pin.IN)
        self.trig.value(0)
        self.echo.value(0)
        self.trig.value(1)
        time.sleep_us(10)
        self.trig.value(0)
        while(self.echo.value()==0):
            pass
        t1 = time.ticks_us()
        while(self.echo.value()==1):
            pass
        t2 = time.ticks_us()
        return round(time.ticks_diff(t2, t1) / 10000 * 340 / 2, 2)

class Servo:
    def __init__(self,pin):
        self.pin=pin

    def write_angle(self,angle):
        id = int(str(self.pin)[4:-1])
        PWM(Pin(id),freq=50,duty=int(40 + 75 * angle / 180))

pin0 = MyPin(0)
pin2 = MyPin(2)
pin4 = MyPin(4)
pin5 = MyPin(5)
pin12 = MyPin(12)
pin13 = MyPin(13)
pin14 = MyPin(14)
pin15 = MyPin(15)
pin16 = MyPin(16)
pin17 = MyPin(17)
pin18 = MyPin(18)
pin19 = MyPin(19)
pin21 = MyPin(21)
pin22 = MyPin(22)
pin23 = MyPin(23)
pin25 = MyPin(25)
pin26 = MyPin(26)
pin27 = MyPin(27)
pin32 = MyPin(32)
pin33 = MyPin(33)
pin34 = MyPin(34)
pin35 = MyPin(35)
pin36 = MyPin(36)
pin39 = MyPin(39)