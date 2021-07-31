/* 아두이노와 node.js 의 연결을 담당합니다. */
const SERIAL_PORT = require('serialport');
const READ_LINE = require('@serialport/parser-readline');
const MY_SERIAL_PORT = new SERIAL_PORT('COM7', {
  baudRate: 9600,
});
const PARSER = MY_SERIAL_PORT.pipe(new READ_LINE());

/* 연결 */
MY_SERIAL_PORT.on('open', () => {
  console.log('Arduino Connection Success !');
});

/* 연결 에러 */
MY_SERIAL_PORT.on('error', (e) => {
  console.log('Arduino Connection Error !', e);
});

module.exports = PARSER;
