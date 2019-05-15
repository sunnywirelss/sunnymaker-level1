'use strict';

goog.provide('Blockly.Blocks.robocat');

goog.require('Blockly.Blocks');


Blockly.Blocks.robocat.HUE = 20;
Blockly.Blocks.robocat.RED = 0;
Blockly.Blocks.robocat.GREEN = 90;
Blockly.Blocks.robocat.BLUE = 210;
Blockly.Blocks.robocat.YELLOW = 58;
Blockly.MIXLY_RB_DIGITIAL_OUTPUT='设置数字输出'
Blockly.MIXLY_RB_PWM_OUTPUT='设置PWM输出(0-255) 管脚#'
Blockly.MIXLY_RB_HIGH='高电平'
Blockly.MIXLY_RB_LOW='低电平'
Blockly.MIXLY_RB_DIGITALREAD_PIN='读取数字管脚#'
Blockly.MIXLY_RB_ANALOGREAD_PIN='读取模拟管脚#'
Blockly.MIXLY_RB_SET='为'

var RB_MS=[["L", "1"],["R", "2"]];
Blockly.ROBOCAT_MOTORS= '设置电机';
Blockly.ROBOCAT_MOTOR_SPEED= '速度为(-255~255)';

Blockly.Blocks.rb_digitalread={
  init:function(){
    this.setColour(Blockly.Blocks.robocat.GREEN);
    this.appendDummyInput("")
      .appendField(new Blockly.FieldImage("../../media/robocat/digital_read.jpg", 64, 32))   	

        .appendField(Blockly.MIXLY_RB_DIGITALREAD_PIN)
	      .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
    this.setOutput(true, [Boolean,Number]);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_DIGITAL_READ);
    }
  };

  Blockly.Blocks.rb_analogread = {
    init: function() {
      this.setColour(Blockly.Blocks.robocat.BLUE);
      this.appendValueInput("PIN", Number)
            .appendField(new Blockly.FieldImage("../../media/robocat/analog_read.jpg", 64, 32))   	

            .appendField(Blockly.MIXLY_RB_ANALOGREAD_PIN)
            .setCheck(Number);
      this.setInputsInline(true);
      this.setOutput(true, Number);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_ANALOG_READ);
    }
  };  



Blockly.Blocks.RB_DIGITIALOUTPUT = {
  init: function() {
    this.setColour(Blockly.Blocks.robocat.YELLOW);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/robocat/digital_output.jpg", 64, 32))

	    .appendField(Blockly.MIXLY_RB_DIGITIAL_OUTPUT)
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
	this.appendDummyInput("")
		.appendField(Blockly.MIXLY_RB_SET)
      	.appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_RB_HIGH, "HIGH"], [Blockly.MIXLY_RB_LOW, "LOW"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};





Blockly.Blocks.RB_PWMOUTPUT = {
  init: function() {

    this.setColour(Blockly.Blocks.robocat.RED);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/robocat/pwm_output.jpg", 64, 32))   	
    .appendField(Blockly.MIXLY_RB_PWM_OUTPUT)

	this.appendValueInput("PIN", Number)
        .setCheck(Number);
    this.appendValueInput("NUM", Number)
    .appendField(Blockly.MIXLY_RB_SET)
        .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);


  }
};

Blockly.Blocks.rb_romeo_motor={
  init:function(){
      this.setColour(Blockly.Blocks.robocat.RED);
      this.appendDummyInput("")
      .appendField(new Blockly.FieldImage("../../media/robocat/motors.jpg", 64, 32))   	
      .appendField(Blockly.ROBOCAT_MOTORS)
      .appendField("#")
        .appendField(new Blockly.FieldDropdown(RB_MS), "PIN");
      this.appendValueInput('speed')
          .setCheck(Number)
          .appendField(Blockly.ROBOCAT_MOTOR_SPEED);
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    }
  };
  Blockly.Blocks.rb_romeo_motor_stop={
  init:function(){
      this.setColour(Blockly.Blocks.robocat.RED);
      this.appendDummyInput("")
      .appendField(new Blockly.FieldImage("../../media/robocat/motors.jpg", 64, 32))   	

        .appendField(Blockly.ROBOCAT_MOTORS)
      .appendField("#")
        .appendField(new Blockly.FieldDropdown(RB_MS), "PIN")
      .appendField(Blockly.MIXLY_STOP);
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    }
  };

//显示-MAX7219-初始化
Blockly.Blocks.LEDs_init = {
  init: function() {
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/robocat/matrix_output.jpg",  64,  32));
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.ROBOCAT_MAX7219_INIT).appendField("DIN").appendField(Blockly.MIXLY_PIN);
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("CS").appendField(Blockly.MIXLY_PIN);
    this.appendValueInput("PIN3").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("CLK").appendField(Blockly.MIXLY_PIN);
    this.appendValueInput("Intensity").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.ROBOCAT_BRIGHTNESS);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.robocat.YELLOW);
    this.setInputsInline(true);
    this.setTooltip(Blockly.ROBOCAT_MAX7219_INIT_TOOLTIP);
    this.setHelpUrl('');
  }
};
//显示-MAX7219-滚动字符串
Blockly.Blocks.LEDs_putString = {
  init: function() {
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/robocat/matrix_output.jpg", 64,  32));
    this.appendValueInput("String", String).setCheck([String, Number]).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.ROBOCAT_LEDs_PUTSTR);
    this.appendValueInput("Speed").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.ROBOCAT_SPEED);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.robocat.YELLOW);
    this.setInputsInline(true);
    this.setTooltip(Blockly.ROBOCAT_LEDs_PUTSTR_TOOLTIP);
    this.setHelpUrl('');
  }
};

//显示-MAX7219-清除LED点阵
// Blockly.Blocks.Ledcontrol_clearDisplay = {
//   init: function() {
//     this.appendDummyInput().appendField("清除LED点阵显示").appendField(new Blockly.FieldTextInput("LC"), "VAR");
//     this.appendValueInput("NUM").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("点阵模块编号（1~8）");
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(Blockly.Blocks.maker17.HUE3);
//     this.setInputsInline(true);
//     this.setTooltip('清除LED点阵(Max7219)显示');
//     this.setHelpUrl('');
//   }
// };
//显示-MAX7219-LED点阵显示图案


Blockly.Blocks.LEDs_DisplayChar = {
  init: function() {
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/robocat/matrix_output.jpg", 64,  32));
    this.appendDummyInput().appendField(Blockly.ROBOCAT_LEDs_DISPLAYCHAR);
    this.appendValueInput("Chars").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.robocat.YELLOW);
    this.setTooltip(Blockly.ROBOCAT_LEDs_DISPLAYCHAR_TOOLTIP);
    this.setHelpUrl('');
  }
};

//显示-max7219点阵选择数组
Blockly.Blocks.LedArray = {
  init: function() {
    this.appendDummyInput("").appendField(Blockly.ROBOCAT_LEDs_LEDARRAY).appendField(new Blockly.FieldTextInput("ROBOCAT_LEDs"), "VAR");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("TRUE"), "a11").appendField(new Blockly.FieldCheckbox("TRUE"), "a12").appendField(new Blockly.FieldCheckbox("TRUE"), "a13").appendField(new Blockly.FieldCheckbox("TRUE"), "a14").appendField(new Blockly.FieldCheckbox("TRUE"), "a15").appendField(new Blockly.FieldCheckbox("TRUE"), "a16").appendField(new Blockly.FieldCheckbox("TRUE"), "a17").appendField(new Blockly.FieldCheckbox("FALSE"), "a18");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("TRUE"), "a21").appendField(new Blockly.FieldCheckbox("TRUE"), "a22").appendField(new Blockly.FieldCheckbox("FALSE"), "a23").appendField(new Blockly.FieldCheckbox("FALSE"), "a24").appendField(new Blockly.FieldCheckbox("FALSE"), "a25").appendField(new Blockly.FieldCheckbox("TRUE"), "a26").appendField(new Blockly.FieldCheckbox("TRUE"), "a27").appendField(new Blockly.FieldCheckbox("TRUE"), "a28");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("TRUE"), "a31").appendField(new Blockly.FieldCheckbox("TRUE"), "a32").appendField(new Blockly.FieldCheckbox("FALSE"), "a33").appendField(new Blockly.FieldCheckbox("FALSE"), "a34").appendField(new Blockly.FieldCheckbox("FALSE"), "a35").appendField(new Blockly.FieldCheckbox("FALSE"), "a36").appendField(new Blockly.FieldCheckbox("TRUE"), "a37").appendField(new Blockly.FieldCheckbox("TRUE"), "a38");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("TRUE"), "a41").appendField(new Blockly.FieldCheckbox("TRUE"), "a42").appendField(new Blockly.FieldCheckbox("FALSE"), "a43").appendField(new Blockly.FieldCheckbox("FALSE"), "a44").appendField(new Blockly.FieldCheckbox("FALSE"), "a45").appendField(new Blockly.FieldCheckbox("FALSE"), "a46").appendField(new Blockly.FieldCheckbox("TRUE"), "a47").appendField(new Blockly.FieldCheckbox("TRUE"), "a48");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("TRUE"), "a51").appendField(new Blockly.FieldCheckbox("TRUE"), "a52").appendField(new Blockly.FieldCheckbox("FALSE"), "a53").appendField(new Blockly.FieldCheckbox("FALSE"), "a54").appendField(new Blockly.FieldCheckbox("FALSE"), "a55").appendField(new Blockly.FieldCheckbox("TRUE"), "a56").appendField(new Blockly.FieldCheckbox("TRUE"), "a57").appendField(new Blockly.FieldCheckbox("TRUE"), "a58");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("TRUE"), "a61").appendField(new Blockly.FieldCheckbox("TRUE"), "a62").appendField(new Blockly.FieldCheckbox("TRUE"), "a63").appendField(new Blockly.FieldCheckbox("TRUE"), "a64").appendField(new Blockly.FieldCheckbox("TRUE"), "a65").appendField(new Blockly.FieldCheckbox("TRUE"), "a66").appendField(new Blockly.FieldCheckbox("FALSE"), "a67").appendField(new Blockly.FieldCheckbox("FALSE"), "a68");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("TRUE"), "a71").appendField(new Blockly.FieldCheckbox("TRUE"), "a72").appendField(new Blockly.FieldCheckbox("FALSE"), "a73").appendField(new Blockly.FieldCheckbox("FALSE"), "a74").appendField(new Blockly.FieldCheckbox("FALSE"), "a75").appendField(new Blockly.FieldCheckbox("TRUE"), "a76").appendField(new Blockly.FieldCheckbox("TRUE"), "a77").appendField(new Blockly.FieldCheckbox("FALSE"), "a78");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("TRUE"), "a81").appendField(new Blockly.FieldCheckbox("TRUE"), "a82").appendField(new Blockly.FieldCheckbox("FALSE"), "a83").appendField(new Blockly.FieldCheckbox("FALSE"), "a84").appendField(new Blockly.FieldCheckbox("FALSE"), "a85").appendField(new Blockly.FieldCheckbox("FALSE"), "a86").appendField(new Blockly.FieldCheckbox("TRUE"), "a87").appendField(new Blockly.FieldCheckbox("TRUE"), "a88");
    this.setOutput(true, Number);
    this.setColour(Blockly.Blocks.robocat.YELLOW);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};


//显示-MAX7219-LED点阵图案
Blockly.Blocks.LEDs_img = {
  init: function() {
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/robocat/matrix_output.jpg", 64,  32));
    this.appendDummyInput("").appendField(Blockly.ROBOCAT_LEDs_IMG).appendField(new Blockly.FieldDropdown([
      ["中", "1010fe9292fe1010"],
	  ["↑", "183c7edb18181818"],
      ["↓", "18181818db7e3c18"],
      ["←", "103060ffff603010"],
      ["→", "080c06ffff060c08"],
      ["♥", "42e7ffffff7e3c18"],
      ["▲", "183c7eff00000000"],
      ["▼", "00000000ff7e3c18"],
      ["◄", "103070f0f0703010"],
      ["►", "080c0e0f0f0e0c08"],
      ["△", "182442ff00000000"],
      ["▽", "00000000ff422418"],
      ["☺", "3c42a581a599423c"],
      ["○", "3c4281818181423c"],
      ["◑", "3c4e8f8f8f8f4e3c"],
      ["◐", "3c72f1f1f1f1723c"],
      ["￥", "4224ff08ff080808"],
      ["Χ", "8142241818244281"],
      ["✓", "0000010204885020"],
      ["□", "007e424242427e00"],
      ["▣", "007e425a5a427e00"],
      ["◇", "1824428181422418"],
      ["♀", "3844444438107c10"],
      ["♂", "0f030579d888d870"],
      ["♪", "0c0e0b080878f860"],
      ["✈", "203098ffff983020"],
      ["卍", "00f21212fe90909e"],
      ["卐", "009e9090fe1212f2"],
      ["︱", "1010101010101010"],
      ["—", "000000ff00000000"],
      ["╱", "0102040810204080"],
      ["＼", "8040201008040201"],
      ["大", "1010fe1010284482"],
      ["小", "1010105454921070"],
      ["米", "00925438fe385492"],
      ["正", "00fe10105e5050fc"],
      ["囧", "ffa5a5c3bda5a5ff"]
    ]), "img_");
    this.setOutput(true);
    this.setTooltip('');
    this.setColour(Blockly.Blocks.robocat.YELLOW);
    this.setHelpUrl('');
  }
};



Blockly.Blocks.RB_S4A = {
  init: function() {
    this.setColour(Blockly.Blocks.robocat.BLUE);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/robocat/s4a.jpg", 64, 32))

    this.appendDummyInput().appendField("S4A_firmware");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("S4A_firmware");
    this.setHelpUrl('www.robocat.com');
  }
};



Blockly.Blocks.RB_IIC_Scan = {
  init: function() {
    this.setColour(Blockly.Blocks.robocat.BLUE);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/robocat/iic_address.jpg", 64, 32))

    this.appendDummyInput().appendField("IIC地址扫描");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("IIC地址扫描");
    this.setHelpUrl('www.robocat.com');
  }
};
