from ESP32 import *


while True:
    pin2.write_digital(1)
    sleep_s(1)
    pin2.write_digital(0)
    sleep_s(1)
