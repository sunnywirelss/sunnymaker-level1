'use strict';

goog.provide('Blockly.Python.turtle');
goog.require('Blockly.Python');

Blockly.Python.turtle_create = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var dropdown_type = this.getFieldValue('TYPE');
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  //var size=window.parseFloat(this.getFieldValue('SIZE'));
  
  //Blockly.Python.definitions_['var_declare'+varName] = varName+'= '+ 'turtle.Turtle()\n';
  var code=varName+'= '+ 'turtle.Turtle()\n';
  return code;
 // return '';
};

Blockly.Python.turtle_move = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
    var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
    var direction = this.getFieldValue('DIR');
  var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code=varName+"." + direction + "(" +  num  + ')\n';
  return code;
};

Blockly.Python.turtle_rotate = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var direction = this.getFieldValue('DIR');
  var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code=varName+"." + direction + "(" +  num  + ')\n';
  return code;
};

Blockly.Python.turtle_setheading = function(){
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var argument = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName + '.setheading('  + argument + ')\n';
  return code;
};

Blockly.Python.turtle_goto = function(){
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var xnum = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var ynum = Blockly.Python.valueToCode(this, 'val', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName + '.goto('  + xnum +','+ynum + ')\n';
  return code;
};

Blockly.Python.turtle_clear = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var clear = this.getFieldValue('DIR');
  var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code=varName+"." + clear + "("   + ')\n';
  return code;
};

Blockly.Python.turtle_penup = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var penup = this.getFieldValue('DIR');
  var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code=varName+"." + penup + "("   + ')\n';
  return code;
};

Blockly.Python.turtle_fill = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var penup = this.getFieldValue('DIR');
  var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code=varName+"." + penup + "_fill("   + ')\n';
  return code;
};

Blockly.Python.turtle_size_speed = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = this.getFieldValue('TUR');
  var size = this.getFieldValue('DIR');
  var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code=varName+"." + size + "(" +  num  + ')\n';
  return code;
};

Blockly.Python.turtle_size = function(){
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var argument = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName + '.pensize('  + argument + ')\n';
  return code;
};


Blockly.Python.turtle_speed = function(){
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var argument = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName + '.speed('  + argument + ')\n';
  return code;
};

Blockly.Python.turtle_circle = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var circle = this.getFieldValue('DIR');
  var argument = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code=varName+"." + circle + "(" +  num  +','+ argument+ ')\n';
  return code;
};

Blockly.Python.turtle_visible = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var visible = this.getFieldValue('DIR');
  var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code=varName+"." + visible + "("   + ')\n';
  return code;
};



Blockly.Python.turtle_pencolor = function(block) {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var color = this.getFieldValue('FIELDNAME');
  var code=varName+"." + 'pencolor' + '("' + color + '")\n';
  return code;
};

Blockly.Python.turtle_fillcolor = function(block) {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var color = this.getFieldValue('FIELDNAME');
  var code=varName+"." + 'fillcolor' + '("' + color + '")\n';
  return code;
};


Blockly.Python.turtle_clone = function() {
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName + '.clone()';
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.turtle_pencolor_hex = function(block) {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var color =  Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ;
  //var color = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName+"." + 'pencolor' + '(' + color + ')\n';
  return code;
};

Blockly.Python.turtle_fillcolor_hex = function(block) {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var color =  Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ;
  var code=varName+"." + 'fillcolor' + '(' + color + ')\n';
  return code;
};