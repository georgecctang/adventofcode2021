// Part 1. Get gamma and epsilon

const getGammaAndEpsilon = (codes) => {
  const codeLength = codes[0].length;
  
  let gammaObj = {};
  let epsilonObj = {};
  for (let i = 0; i < codeLength; i++) {
    let ones = 0;
    let zeroes = 0;

    for (let j = 0; j < codes.length; j++) {
      if (codes[j][i] === '1') {
        ones++
      } else {
        zeroes++
      }      
    }
    gammaObj[Number(i)] = ones >= zeroes ? 1 : 0
    epsilonObj[Number(i)] = ones >= zeroes ? 0 : 1
  }

  let gamma = 0;
  let epsilon = 0;
  for (let i in gammaObj) {
    gamma += 2**(codeLength - 1 - i) * gammaObj[i]
  }

  for (let i in epsilonObj) {
    epsilon += 2**(codeLength - 1 - i) * epsilonObj[i]
  }

  return gamma * epsilon;
} 

// Part 2. Get O2 and CO2

const convertBinaryToDecimal = (input) => {
  const binaryLength = input.length;
  let output = 0;
  for (let i = 0; i < binaryLength; i++) {
    output += 2**(binaryLength - 1 - i) * Number(input[i]); 
  }
  return output;
}


const getGas = (input, keepMajority = true) => {

  let data = input;
  const codeLength = data[0].length;
  
  let indexPosition = 0;
  // stop if 1. one code left or 2. all index scanned 
  while (indexPosition < codeLength && data.length > 1) {
    let ones = 0;
    let zeroes = 0;
    for (let dataPosition = 0; dataPosition < data.length; dataPosition++) {
      if (data[dataPosition][indexPosition] === '1') {
        ones++;
      } else {
        zeroes++;
      }
    }    
    let binaryToKeep = keepMajority ? (ones >= zeroes ? '1' : '0'): (zeroes > ones ? '1' : '0');
    // console.log('binaryToKeep',indexToKeep);
    // create another data list
    const tempData = [];

    for (let dataPosition = 0; dataPosition < data.length; dataPosition++) {
      if (data[dataPosition][indexPosition] === binaryToKeep) {
        tempData.push(data[dataPosition])
        // console.log('position',i);
      }
    }
    // console.log(tempData);
    data = tempData;
    indexPosition++;
  }

  return convertBinaryToDecimal(data[0]);
  
}



const fs = require('fs');


fs.readFile('./data/day03.txt',  (err, data) => { 
  if (err) throw err; 

  const str = data.toString().split("\n");

  // console.log(getGammaAndEpsilon(str));
  console.log(getGas(str, true) *getGas(str, false) );
  // console.log();
});