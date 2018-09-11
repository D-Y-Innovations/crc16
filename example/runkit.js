var crc32 = require('node-crc32');

var stream = 'BESTPOSA,COM1,0,78.0,FINESTEERING,1427,325298.000,00000000,6145,2748;SOL_COMPUTED,SINGLE,51.11678928753,-114.03886216575,1064.3470,-16.2708,WGS84,2.3434,1.3043,4.7300,"",0.000,0.000,7,7,0,0,0,06,0,03';
var sumShouldStr = '9c9a92bb';

//check sum
var sum = crc32.checkSum(stream, 'utf-8');
console.log('check stream ' + stream + ', result: ' + sum);

//verify sum
// var isValid = crc32.verifySum(stream + sumShouldStr);
// console.log('verify sum result: ' + isValid);
