#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <RTC.h>

LiquidCrystal_I2C mylcd(0x20,16,2);
DS1307 myRTC(27,30);

void setup(){
  mylcd.init();
  mylcd.backlight();
  mylcd.clear();
  myRTC.setTime(21,28,0);
  myRTC.setDate(2019,1,29);
  myRTC.setDOW(2019,1,29);
}

void loop(){
  mylcd.setCursor(0, 0);
  mylcd.print(String("T:") + String(String(myRTC.getYear()) + String(String("-") + String(String(myRTC.getMonth()) + String(String("-") + String(String(myRTC.getDay()) + String("     ")))))));
  mylcd.setCursor(0, 1);
  mylcd.print(String("T:") + String(String(myRTC.getHour()) + String(String("-") + String(String(myRTC.getMinute()) + String(String("-") + String(String(myRTC.getSecond()) + String("     ")))))));
  delay(500);

}