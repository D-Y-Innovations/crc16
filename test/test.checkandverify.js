var should = require('chai').should();
var chance = require('chance').Chance();
var crc16 = require('../index');

function generateRandomStr(option){
  option = option || {};
  var len = Math.ceil(Math.random() * option.maxLen);
  var str = chance.string({length: len});
  return str;
}
function generateRandomHex(option){
  option = option || {};
  var len = Math.ceil(Math.random() * option.maxLen / 2) * 2;
  var str = chance.string({
    length: len,
    pool: '0123456789abcdef'
  });
  return str;
}

describe('Check sum and verify it', function() {
  describe('When input stream is a random string', function() {
    for(var i = 0; i < 10000; i++){
      var randomStr = generateRandomStr({maxLen: 100});
      var randomBuf = (new Buffer(randomStr)).toString('hex');
      var sum = crc16.checkSum(randomBuf);
      (function(randomStr, randomBuf, sum){
        it('UTF8 string `' + randomStr + '` sum `'+ sum +'`', function(){
          sum.should.be.a('string');
          var streamWithSum = randomBuf + sum;
          var isValid = crc16.verifySum(streamWithSum);
          isValid.should.equal(true);
        })
      })(randomStr, randomBuf, sum)
    }
  });

  describe('When input stram is a random hex', function(){
    for(var i = 0; i < 10000; i++){
      var randomStr = generateRandomHex({maxLen: 100});
      var sum = crc16.checkSum(randomStr);
      (function(randomStr, sum){
        it('Hex string `' + randomStr + '` sum `'+ sum +'`', function(){
          sum.should.be.a('string');
          var streamWithSum = randomStr + sum;
          var isValid = crc16.verifySum(streamWithSum);
          isValid.should.equal(true);
        })
      })(randomStr, sum)
    }
  })
});
