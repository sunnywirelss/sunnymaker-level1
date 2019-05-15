# 1 "C:\\Users\\lenovo\\Desktop\\产品手册-阳光小创客\\sunnyduino\\Mixly0.998_WIN(7.9)\\testArduino\\testArduino.ino"
# 1 "C:\\Users\\lenovo\\Desktop\\产品手册-阳光小创客\\sunnyduino\\Mixly0.998_WIN(7.9)\\testArduino\\testArduino.ino"
# 2 "C:\\Users\\lenovo\\Desktop\\产品手册-阳光小创客\\sunnyduino\\Mixly0.998_WIN(7.9)\\testArduino\\testArduino.ino" 2
# 3 "C:\\Users\\lenovo\\Desktop\\产品手册-阳光小创客\\sunnyduino\\Mixly0.998_WIN(7.9)\\testArduino\\testArduino.ino" 2
# 4 "C:\\Users\\lenovo\\Desktop\\产品手册-阳光小创客\\sunnyduino\\Mixly0.998_WIN(7.9)\\testArduino\\testArduino.ino" 2

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
