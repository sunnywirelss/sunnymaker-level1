from machine import Pin
from machine import PWM
from machine import ADC
from machine import I2C
from machine import TouchPad
import time

# Time

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

# Button

def btn_a(p):
    button_a.val = 1

def btn_b(p):
    button_b.val = 1

class Button:
    def __init__(self, pin):
        self.val = 0
        self.pin = pin
 
    def was_pressed(self):
        if self.val == 1:
            self.val = 0
            return 1
        else:
            return 0

    def is_pressed(self):
        return 1 - Pin(self.pin).value()

# Pin

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

pin0 = MyPin(0)
pin2 = MyPin(2)
pin4 = MyPin(4)
pin5 = MyPin(5)
pin8 = MyPin(8)
pin9 = MyPin(9)
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
pin32.read_digital()
pin33.read_digital()
pin34.read_digital()
pin35.read_digital()
pin34.irq(handler = btn_a, trigger = Pin.IRQ_FALLING)
pin35.irq(handler = btn_b, trigger = Pin.IRQ_FALLING)
button_a = Button(pin=34)
button_b = Button(pin=35)

i2c = I2C(scl=Pin(22), sda=Pin(21), freq=100000)