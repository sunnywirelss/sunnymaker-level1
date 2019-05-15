let item = DigitalPin.P0;


basic.forever(() => {
  pins.digitalWritePin(item,1);
});
