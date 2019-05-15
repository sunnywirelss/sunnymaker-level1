'use strict';

goog.provide('Blockly.Arduino.robocat');

goog.require('Blockly.Arduino');

Blockly.Arduino.rb_romeo_motor=function(){
   var dropdown_pin = this.getFieldValue('PIN');
   var speed = Blockly.Arduino.valueToCode(this, 'speed',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
   var code='setMotor('+dropdown_pin+', '+speed+');\n';
   Blockly.Arduino.setups_['setup_output_4'] = 'pinMode(4, OUTPUT);';
   Blockly.Arduino.setups_['setup_output_5'] = 'pinMode(5, OUTPUT);';
   Blockly.Arduino.setups_['setup_output_6'] = 'pinMode(6, OUTPUT);';
   Blockly.Arduino.setups_['setup_output_7'] = 'pinMode(7, OUTPUT);';
   Blockly.Arduino.setups_['setup_output_w4'] = 'digitalWrite(4, LOW);';
   Blockly.Arduino.setups_['setup_output_w5'] = 'digitalWrite(5, LOW);';
   Blockly.Arduino.setups_['setup_output_w6'] = 'digitalWrite(6, LOW);';
   Blockly.Arduino.setups_['setup_output_w7'] = 'digitalWrite(7, LOW);';
   var funcName='setMotor';
   var code2='void '+funcName+'(int motorId, int speed) {\n' 
	+ '  int speedPin, directionPin;\n'
	+ '  if (motorId == 1){\n'
	+ '  	speedPin = 5;\n'
	+ '  	directionPin = 4;\n'
	+ '  } else {\n'
	+ '  	if (motorId == 2){\n'
	+ '  		speedPin = 6;\n'
	+ '  		directionPin = 7;\n'
	+ '  	} else {\n'
	+ '  		return;\n'
	+ '  	}\n'
	+ '  }\n'
	+ '  if (speed == 0){\n'
	+ '  	digitalWrite(speedPin, LOW);\n'
	+ '  }\n'
	+ '  if (speed > 0){\n'
	+ '  	digitalWrite(directionPin, HIGH);\n'
	+ '  	analogWrite(speedPin, speed);\n'
	+ '  } else {\n'
	+ '  	digitalWrite(directionPin, LOW);\n'
	+ '  	analogWrite(speedPin, -speed);\n'
	+ '  }\n'
	+ '}\n';
    Blockly.Arduino.definitions_[funcName] = code2;
   return code;
};

Blockly.Arduino.rb_romeo_motor_stop=function(){
   var dropdown_pin = this.getFieldValue('PIN');
   var code='setMotor('+dropdown_pin+', 0);\n';
   Blockly.Arduino.setups_['setup_output_4'] = 'pinMode(4, OUTPUT);';
   Blockly.Arduino.setups_['setup_output_5'] = 'pinMode(5, OUTPUT);';
   Blockly.Arduino.setups_['setup_output_6'] = 'pinMode(6, OUTPUT);';
   Blockly.Arduino.setups_['setup_output_7'] = 'pinMode(7, OUTPUT);';
   Blockly.Arduino.setups_['setup_output_w4'] = 'digitalWrite(4, LOW);';
   Blockly.Arduino.setups_['setup_output_w5'] = 'digitalWrite(5, LOW);';
   Blockly.Arduino.setups_['setup_output_w6'] = 'digitalWrite(6, LOW);';
   Blockly.Arduino.setups_['setup_output_w7'] = 'digitalWrite(7, LOW);';
   var funcName='setMotor';
   var code2='void '+funcName+'(int motorId, int speed) {\n' 
	+ '  int speedPin, directionPin;\n'
	+ '  if (motorId == 1){\n'
	+ '  	speedPin = 5;\n'
	+ '  	directionPin = 4;\n'
	+ '  } else {\n'
	+ '  	if (motorId == 2){\n'
	+ '  		speedPin = 6;\n'
	+ '  		directionPin = 7;\n'
	+ '  	} else {\n'
	+ '  		return;\n'
	+ '  	}\n'
	+ '  }\n'
	+ '  if (speed == 0){\n'
	+ '  	digitalWrite(speedPin, LOW);\n'
	+ '  }\n'
	+ '  if (speed > 0){\n'
	+ '  	digitalWrite(directionPin, HIGH);\n'
	+ '  	analogWrite(speedPin, speed);\n'
	+ '  } else {\n'
	+ '  	digitalWrite(directionPin, LOW);\n'
	+ '  	analogWrite(speedPin, -speed);\n'
	+ '  }\n'
	+ '}\n';
    Blockly.Arduino.definitions_[funcName] = code2;
   return code;
};

Blockly.Arduino.RB_DIGITIALOUTPUT = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_stat = this.getFieldValue('STAT');
  Blockly.Arduino.setups_['setup_output_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'digitalWrite('+dropdown_pin+','+dropdown_stat+');\n'
  return code;
};







Blockly.Arduino.RB_PWMOUTPUT=function(){
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  //var dropdown_stat = this.getFieldValue('STAT');
  var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  //Blockly.Arduino.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'analogWrite(' + dropdown_pin + ',' + value_num + ');\n';
  return code;
};

Blockly.Arduino.rb_digitalread = function () {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
  var code = 'digitalRead(' + dropdown_pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.rb_analogread = function () {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  //Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'analogRead(' + dropdown_pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


//显示-MAX7219-初始化
Blockly.Arduino.LEDs_init = function() {
  var pin_din = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var pin_cs = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var pin_clk = Blockly.Arduino.valueToCode(this, 'PIN3', Blockly.Arduino.ORDER_ATOMIC);
  // var lc_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  var lc_num = 1;
  var Intensity = Blockly.Arduino.valueToCode(this, 'Intensity', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define0_MaxMatrix'] = '#include "MaxMatrix.h"';
  Blockly.Arduino.definitions_['define1_MaxMatrix'] = '#include <avr/pgmspace.h>';
  Blockly.Arduino.definitions_['define_LIST'] = 'PROGMEM const unsigned char LIST[]{\n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B00000000,B00000000,B00000000,B00000000,B00000000,//space\n';
  Blockly.Arduino.definitions_['define_LIST'] += '1,8,B01011111,B00000000,B00000000,B00000000,B00000000,//!\n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B00000011,B00000000,B00000011,B00000000,B00000000,// \n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00010100,B00111110,B00010100,B00111110,B00010100,//# \n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00100100,B01101010,B00101011,B00010010,B00000000,//$ \n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B01100011,B00010011,B00001000,B01100100,B01100011,//% \n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00110110,B01001001,B01010110,B00100000,B01010000,//& \n';
  Blockly.Arduino.definitions_['define_LIST'] += '1,8,B00000011,B00000000,B00000000,B00000000,B00000000,//\n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B00011100,B00100010,B01000001,B00000000,B00000000,//( \n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B01000001,B00100010,B00011100,B00000000,B00000000,//) \n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00101000,B00011000,B00001110,B00011000,B00101000,//* \n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00001000,B00001000,B00111110,B00001000,B00001000,//+ \n';
  Blockly.Arduino.definitions_['define_LIST'] += '2,8,B10110000,B01110000,B00000000,B00000000,B00000000,//, \n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00001000,B00001000,B00001000,B00001000,B00000000,//- \n';
  Blockly.Arduino.definitions_['define_LIST'] += '2,8,B01100000,B01100000,B00000000,B00000000,B00000000,//. \n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01100000,B00011000,B00000110,B00000001,B00000000,/// \n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111110,B01000001,B01000001,B00111110,B00000000,//0\n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B01000010,B01111111,B01000000,B00000000,B00000000,//1\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01100010,B01010001,B01001001,B01000110,B00000000,//2\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00100010,B01000001,B01001001,B00110110,B00000000,//3\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00011000,B00010100,B00010010,B01111111,B00000000,//4\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00100111,B01000101,B01000101,B00111001,B00000000,//5\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111110,B01001001,B01001001,B00110000,B00000000,//6\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01100001,B00010001,B00001001,B00000111,B00000000,//7\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00110110,B01001001,B01001001,B00110110,B00000000,//8\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00000110,B01001001,B01001001,B00111110,B00000000,//9\n';
  Blockly.Arduino.definitions_['define_LIST'] += '2,8,B01010000,B00000000,B00000000,B00000000,B00000000,//: \n';
  Blockly.Arduino.definitions_['define_LIST'] += '2,8,B10000000,B01010000,B00000000,B00000000,B00000000,//; \n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B00010000,B00101000,B01000100,B00000000,B00000000,//< \n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B00010100,B00010100,B00010100,B00000000,B00000000,//= \n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B01000100,B00101000,B00010000,B00000000,B00000000,//> \n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00000010,B01011001,B00001001,B00000110,B00000000,//? \n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00111110,B01001001,B01010101,B01011101,B00001110,//@ \n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111110,B00010001,B00010001,B01111110,B00000000,//A\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B01001001,B01001001,B00110110,B00000000,//B\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111110,B01000001,B01000001,B00100010,B00000000,//C\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B01000001,B01000001,B00111110,B00000000,//D\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B01001001,B01001001,B01000001,B00000000,//E\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B00001001,B00001001,B00000001,B00000000,//F\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111110,B01000001,B01001001,B01111010,B00000000,//G\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B00001000,B00001000,B01111111,B00000000,//H\n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B01000001,B01111111,B01000001,B00000000,B00000000,//I\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00110000,B01000000,B01000001,B00111111,B00000000,//J\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B00001000,B00010100,B01100011,B00000000,//K\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B01000000,B01000000,B01000000,B00000000,//L\n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B01111111,B00000010,B00001100,B00000010,B01111111,//M\n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B01111111,B00000100,B00001000,B00010000,B01111111,//N\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111110,B01000001,B01000001,B00111110,B00000000,//O\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B00001001,B00001001,B00000110,B00000000,//P\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111110,B01000001,B01000001,B10111110,B00000000,//Q\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B00001001,B00001001,B01110110,B00000000,//R\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01000110,B01001001,B01001001,B00110010,B00000000,//S\n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00000001,B00000001,B01111111,B00000001,B00000001,//T\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111111,B01000000,B01000000,B00111111,B00000000,//U\n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00001111,B00110000,B01000000,B00110000,B00001111,//V\n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00111111,B01000000,B00111000,B01000000,B00111111,//W\n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B01100011,B00010100,B00001000,B00010100,B01100011,//X\n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00000111,B00001000,B01110000,B00001000,B00000111,//Y\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01100001,B01010001,B01001001,B01000111,B00000000,//Z\n';
  Blockly.Arduino.definitions_['define_LIST'] += '2,8,B01111111,B01000001,B00000000,B00000000,B00000000,//[ \n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00000001,B00000110,B00011000,B01100000,B00000000,//\backslash\n';
  Blockly.Arduino.definitions_['define_LIST'] += '2,8,B01000001,B01111111,B00000000,B00000000,B00000000,//] \n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B00000010,B00000001,B00000010,B00000000,B00000000,//hat\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01000000,B01000000,B01000000,B01000000,B00000000,//_ \n';
  Blockly.Arduino.definitions_['define_LIST'] += '2,8,B00000001,B00000010,B00000000,B00000000,B00000000,//` \n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00100000,B01010100,B01010100,B01111000,B00000000,//a\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B01000100,B01000100,B00111000,B00000000,//b\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111000,B01000100,B01000100,B00101000,B00000000,//c\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111000,B01000100,B01000100,B01111111,B00000000,//d\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111000,B01010100,B01010100,B00011000,B00000000,//e\n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B00000100,B01111110,B00000101,B00000000,B00000000,//f\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B10011000,B10100100,B10100100,B01111000,B00000000,//g\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B00000100,B00000100,B01111000,B00000000,//h\n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B01000100,B01111101,B01000000,B00000000,B00000000,//i\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01000000,B10000000,B10000100,B01111101,B00000000,//j\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B00010000,B00101000,B01000100,B00000000,//k\n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B01000001,B01111111,B01000000,B00000000,B00000000,//l\n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B01111100,B00000100,B01111100,B00000100,B01111000,//m\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111100,B00000100,B00000100,B01111000,B00000000,//n\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111000,B01000100,B01000100,B00111000,B00000000,//o\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B11111100,B00100100,B00100100,B00011000,B00000000,//p\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00011000,B00100100,B00100100,B11111100,B00000000,//q\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111100,B00001000,B00000100,B00000100,B00000000,//r\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01001000,B01010100,B01010100,B00100100,B00000000,//s\n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B00000100,B00111111,B01000100,B00000000,B00000000,//t\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111100,B01000000,B01000000,B01111100,B00000000,//u\n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00011100,B00100000,B01000000,B00100000,B00011100,//v\n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00111100,B01000000,B00111100,B01000000,B00111100,//w\n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B01000100,B00101000,B00010000,B00101000,B01000100,//x\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B10011100,B10100000,B10100000,B01111100,B00000000,//y\n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B01100100,B01010100,B01001100,B00000000,B00000000,//z\n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B00001000,B00110110,B01000001,B00000000,B00000000,//{ \n';
  Blockly.Arduino.definitions_['define_LIST'] += '1,8,B01111111,B00000000,B00000000,B00000000,B00000000,//| \n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B01000001,B00110110,B00001000,B00000000,B00000000,//} \n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00001000,B00000100,B00001000,B00000100,B00000000,//~ \n';
  Blockly.Arduino.definitions_['define_LIST'] += '};'
  Blockly.Arduino.definitions_['define2_MaxMatrix'] = 'MaxMatrix LEDs(' + pin_din + ',' + pin_cs + ',' + pin_clk + ',' + lc_num + ');\nbyte buffer[100];';
  Blockly.Arduino.setups_['setup_init'] = '	LEDs.init();';
  Blockly.Arduino.setups_['setup_Intensity'] = '	LEDs.setIntensity(' + Intensity + ');';
  var code = '';
  return code;
};

//显示-MAX7219-显示字符串
Blockly.Arduino.LEDs_putString = function() {
  var str = Blockly.Arduino.valueToCode(this, 'String', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';
  var speed = Blockly.Arduino.valueToCode(this, 'Speed', Blockly.Arduino.ORDER_ATOMIC);
  var code = '';
  if (str.charAt(0) == '"') {
    Blockly.Arduino.definitions_['define_message'] = 'char message[] = ' + str + ';';
  } else {
    Blockly.Arduino.definitions_['define_message'] = 'char message[100];';
    code = str + '.toCharArray(message,100);\n';
  }
  Blockly.Arduino.definitions_['define_putChar'] = 'void putChar(char c, int scrollspeed)\n{\nif (c < 32 || c > 127) \nreturn;\nc -= 32;\nmemcpy_P(buffer, LIST + 7*c, 7);\n  LEDs.writeSprite(64, 0, buffer);\nLEDs.setColumn(64 + buffer[0], 0);\nfor (int i=0; i<buffer[0]+1; i++)\n {\ndelay(scrollspeed);\nLEDs.shiftLeft(false, false);\n}\n}';
  Blockly.Arduino.definitions_['define_putString'] = 'void putString(char* s, int scrollspeed)\n{\nwhile (*s != 0)\n{\nputChar(*s, scrollspeed);\ns++;\n}\n}';
  code += 'putString(message, ' + speed + ');\n';
  return code;
};




//显示-max7219-显示图案 
Blockly.Arduino.LEDs_DisplayChar = function() {
  //var lc_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  //  var lc_num=1;
  var code;
  var lc_chars = Blockly.Arduino.valueToCode(this, 'Chars', Blockly.Arduino.ORDER_ATOMIC);
  code = 'for (int i = 0; i < 8; i++)\n';
  code += ' LEDs.setColumn(i, ' + lc_chars + '[i]);\n';
  return code;
};

//显示-max7219点阵选择数组
Blockly.Arduino.LedArray = function() {
  var varName = this.getFieldValue('VAR');
  var a = new Array();
  for (var i = 1; i < 9; i++) {
    a[i] = new Array();
    for (var j = 1; j < 9; j++) {
      a[i][j] = (this.getFieldValue('a' + i + j) == "TRUE") ? 1 : 0;
    }
  }
  var code = '{';
  for (var i = 1; i < 9; i++) {
    var tmp = ""
    for (var j = 1; j < 9; j++) {
      tmp += a[i][j];
    }
    tmp = (parseInt(tmp, 2)).toString(16)
    if (tmp.length == 1) tmp = "0" + tmp;
    code += '0x' + tmp + ((i != 8) ? ',' : '');
  }
  code += '};\n';
  //Blockly.Arduino.definitions_[this.id] = "byte LedArray_"+clearString(this.id)+"[]="+code;
  Blockly.Arduino.definitions_[varName] = "byte " + varName + "[]=" + code;
  //return ["LedArray_"+clearString(this.id), Blockly.Arduino.ORDER_ATOMIC];
  return [varName, Blockly.Arduino.ORDER_ATOMIC];
};

//显示-max7219-选择图案
Blockly.Arduino.LEDs_img = function() {
  var dropdown_img_ = this.getFieldValue('img_');
  var code = '"' + dropdown_img_ + '"';
  code = '{';
  for (var i = 0; i < 15; i += 2) {
    code += '0x' + dropdown_img_.substr(i, 2) + ((i != 14) ? ',' : '');
  }
  code += '};\n';
  Blockly.Arduino.definitions_['max7219_img_' + dropdown_img_] = "byte " + 'max7219_img_' + dropdown_img_ + "[]=" + code;
  return ['max7219_img_' + dropdown_img_, Blockly.Arduino.ORDER_ATOMIC];
};








Blockly.Arduino.df_buzzer3=function(){
   var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
   var fre = Blockly.Arduino.valueToCode(this, 'FREQUENCY',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
   var dur = Blockly.Arduino.valueToCode(this, 'DURATION',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
   var code="tone("+dropdown_pin+","+fre+","+dur+");\n";
   Blockly.Arduino.setups_['setup_output_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
   return code;
};

Blockly.Arduino.df_btn = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'digitalRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.df_vibration = Blockly.Arduino.df_btn;
Blockly.Arduino.df_tilt = Blockly.Arduino.df_btn;
Blockly.Arduino.df_touch = Blockly.Arduino.df_btn;
Blockly.Arduino.df_magnetic = Blockly.Arduino.df_btn;
Blockly.Arduino.df_pyroelectric_infrared = Blockly.Arduino.df_btn;
Blockly.Arduino.df_joystick_d = Blockly.Arduino.df_btn;

Blockly.Arduino.df_potentiometer = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  //Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'analogRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.df_joystick_a = Blockly.Arduino.df_potentiometer;
Blockly.Arduino.df_rotation = Blockly.Arduino.df_potentiometer;
Blockly.Arduino.df_voltage = Blockly.Arduino.df_potentiometer;
Blockly.Arduino.df_piezo_disk_virbration = Blockly.Arduino.df_potentiometer;
Blockly.Arduino.df_sound = Blockly.Arduino.df_potentiometer;

Blockly.Arduino.df_light = Blockly.Arduino.df_potentiometer;

Blockly.Arduino.df_grayscale = Blockly.Arduino.df_potentiometer;

Blockly.Arduino.df_flame = Blockly.Arduino.df_potentiometer;

Blockly.Arduino.df_temperature = Blockly.Arduino.df_potentiometer;

Blockly.Arduino.df_accelerometer = Blockly.Arduino.df_potentiometer;

Blockly.Arduino.df_moisture = Blockly.Arduino.df_potentiometer;
Blockly.Arduino.df_water = Blockly.Arduino.df_potentiometer;

Blockly.Arduino.df_co = Blockly.Arduino.df_potentiometer;
Blockly.Arduino.df_Sharp_GP2Y0A21 = Blockly.Arduino.df_potentiometer;

Blockly.Arduino.df_relay = Blockly.Arduino.df_led;

Blockly.Arduino.df_lcd_print = function() {
  var str1 = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")'
  var str2 = Blockly.Arduino.valueToCode(this, 'TEXT2', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")'
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_df_lcd'] = '#include <LiquidCrystal_I2C.h>';
  Blockly.Arduino.definitions_['var_df_lcd'] = 'LiquidCrystal_I2C df_lcd(0x20,16,2);';
  Blockly.Arduino.setups_['setup_df_lcd1'] = 'df_lcd.init();';
  Blockly.Arduino.setups_['setup_df_lcd2'] = 'df_lcd.backlight();';
  var code = 'df_lcd.setCursor(0, 0);\n'
  code+='df_lcd.print('+str1+');\n';
  code+='df_lcd.setCursor(0, 1);\n';
  code+='df_lcd.print('+str2+');\n';
  return code;
};

Blockly.Arduino.df_lcd_power = function() {
  var dropdown_stat = this.getFieldValue('STAT');
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_df_lcd'] = '#include <LiquidCrystal_I2C.h>';
  Blockly.Arduino.definitions_['var_df_lcd'] = 'LiquidCrystal_I2C df_lcd(0x20,16,2);';
  Blockly.Arduino.setups_['setup_df_lcd1'] = 'df_lcd.init();';
  Blockly.Arduino.setups_['setup_df_lcd2'] = 'df_lcd.backlight();';
  var code = 'df_lcd.'+dropdown_stat+'();\n'
  return code;
};

Blockly.Arduino.RB_S4A = function(block) {
  Blockly.Arduino.definitions_['define_S4A1'] ='typedef enum\n{\n  input, servomotor, pwm, digital\n}\npinType;\n\ntypedef struct pin\n{\n  pinType type;\n  int state;\n};\n\npin arduinoPins[14];\n\nunsigned long lastDataReceivedTime = millis();\n'
  Blockly.Arduino.definitions_['define_S4A2'] ='void configurePins()\n{\n  arduinoPins[0].type=input;\n  arduinoPins[1].type=input;\n  arduinoPins[2].type=input;\n  arduinoPins[3].type=input;\n  arduinoPins[4].type=servomotor;\n  arduinoPins[5].type=pwm;\n  arduinoPins[6].type=pwm;\n  arduinoPins[7].type=servomotor;\n  arduinoPins[8].type=servomotor;\n  arduinoPins[9].type=pwm;\n  arduinoPins[10].type=digital;\n  arduinoPins[11].type=digital;\n  arduinoPins[12].type=digital;\n  arduinoPins[13].type=digital;\n}\n'
  Blockly.Arduino.definitions_['define_S4A3'] ='void resetPins()\n{\n  for (byte index=0; index <=13; index++)\n  {\n    if (arduinoPins[index].type!=input)\n    {\n      pinMode(index, OUTPUT);\n      if (arduinoPins[index].type==servomotor)\n      {\n        arduinoPins[index].state = 255;\n        servo (index, 255);\n      }\n      else\n      {\n        arduinoPins[index].state=0;\n        digitalWrite(index,LOW);\n      }\n    }\n  }\n}'
  Blockly.Arduino.definitions_['define_S4A4'] ='void sendSensorValues()\n{\n  unsigned int sensorValues[6], readings[5];\n  byte sensorIndex;\n  for (sensorIndex = 0; sensorIndex < 6; sensorIndex++)\n  {\n    for (byte p = 0; p < 5; p++)\n      readings[p] = analogRead(sensorIndex);\n    insertionSort(readings, 5);\n    sensorValues[sensorIndex] = readings[2];\n  }\n  for (sensorIndex = 0; sensorIndex < 6; sensorIndex++)\n    ScratchBoardSensorReport(sensorIndex, sensorValues[sensorIndex]);\n  ScratchBoardSensorReport(6, digitalRead(2)?1023:0);\n  ScratchBoardSensorReport(7, digitalRead(3)?1023:0);\n}\n'
  Blockly.Arduino.definitions_['define_S4A5'] ='void insertionSort(unsigned int* array, unsigned int n)\n{\n  for (int i = 1; i < n; i++)\n    for (int j = i; (j > 0) && ( array[j] < array[j-1] ); j--)\n      swap( array, j, j-1 );\n}\n'
  Blockly.Arduino.definitions_['define_S4A6'] ='void swap(unsigned int* array, unsigned int a, unsigned int b)\n{\n  unsigned int temp = array[a];\n  array[a] = array[b];\n  array[b] = temp;\n}\n'
  Blockly.Arduino.definitions_['define_S4A7'] ='void ScratchBoardSensorReport(byte sensor, int value)\n{\n  Serial.write( B10000000\n    | ((sensor & B1111)<<3)\n    | ((value>>7) & B111));\n  Serial.write( value & B1111111);\n}\n'
  Blockly.Arduino.definitions_['define_S4A8'] ='void readSerialPort()\n{\n  byte pin;  int newVal;\n  static byte actuatorHighByte, actuatorLowByte;\n  static byte readingSM = 0;\n  if (Serial.available())\n  {\n    if (readingSM == 0)\n    {\n      actuatorHighByte = Serial.read();\n      if (actuatorHighByte >= 128) readingSM = 1;\n    }\n    else if (readingSM == 1)\n    {\n      actuatorLowByte = Serial.read();\n      if (actuatorLowByte < 128) readingSM = 2;\n      else readingSM = 0;\n    }\n    if (readingSM == 2)\n    {\n      lastDataReceivedTime = millis();\n      pin = ((actuatorHighByte >> 3) & 0x0F);\n      newVal = ((actuatorHighByte & 0x07) << 7) | (actuatorLowByte & 0x7F);\n      if(arduinoPins[pin].state != newVal)\n      {\n        arduinoPins[pin].state = newVal;\n        updateActuator(pin);\n      }\n      readingSM = 0;\n    }\n  }\n  else checkScratchDisconnection();\n}\n'
  Blockly.Arduino.definitions_['define_S4A9'] ='void reset()\n{\n  resetPins();\n  sendSensorValues();\n  lastDataReceivedTime = millis();\n}\n'
  Blockly.Arduino.definitions_['define_S4Aa'] ='void updateActuator(byte pinNumber)\n{\n  if (arduinoPins[pinNumber].type==digital)\n digitalWrite(pinNumber, arduinoPins[pinNumber].state);\n  else\n if (arduinoPins[pinNumber].type==pwm)\n analogWrite(pinNumber, arduinoPins[pinNumber].state);\n}\n'
  Blockly.Arduino.definitions_['define_S4Ab'] ='void sendUpdateServomotors()\n{\n  for (byte p = 0; p < 10; p++)\n    if (arduinoPins[p].type == servomotor)\n servo(p, arduinoPins[p].state);\n}\n'
  Blockly.Arduino.definitions_['define_S4Ac'] ='void servo (byte pinNumber, byte angle)\n{\n  if (angle != 255)\n    pulse(pinNumber, (angle * 10) + 600);\n}\n'
  Blockly.Arduino.definitions_['define_S4Ad'] ='void pulse (byte pinNumber, unsigned int pulseWidth)\n{\n  digitalWrite(pinNumber, HIGH);\n  delayMicroseconds(pulseWidth);\n  digitalWrite(pinNumber, LOW);\n}\n'
  Blockly.Arduino.definitions_['define_S4Ae'] ='void checkScratchDisconnection()\n{\n  if (millis() - lastDataReceivedTime > 1000)\n reset();\n}\n'
  Blockly.Arduino.setups_['setup_S4A0'] = 'Serial.begin(115200);\n  Serial.flush();\n  configurePins();\n  resetPins();'
  var code = 'static unsigned long timerCheckUpdate = millis();\nif (millis()-timerCheckUpdate>=20)\n{\n  sendUpdateServomotors();\n  sendSensorValues();\n  timerCheckUpdate=millis();\n}\nreadSerialPort();';
  return code;
};

Blockly.Arduino.RB_IIC_Scan = function() {
 Blockly.Arduino.definitions_['include_WIRE'] = '#include <Wire.h>';    
 Blockly.Arduino.setups_['setup_delay2000'] = '  Wire.begin();\n    Serial.begin(9600);\n    Serial.println("I2C Scanner");\n';
 var code='  byte error, address;\n  int nDevices;\n  Serial.println("Scanning...");\n  nDevices = 0;\n  for (address = 1; address < 127; address++ )\n{\n     Wire.beginTransmission(address);\n   error = Wire.endTransmission();\n   if (error == 0){\nSerial.print("I2C device found at address 0x");\nif (address < 16)\nSerial.print("0"); \nSerial.print(address, HEX);  \nSerial.println(" !");\nnDevices++;\n}\nelse if (error == 4){\nSerial.print("Unknow error at address 0x");\nif (address < 16)Serial.print("0"); \nSerial.println(address, HEX);  }\n}\nif (nDevices == 0)\nSerial.println("No I2C devices found");\nelse \nSerial.println("done");\ndelay(5000); ';
 return code;
};
