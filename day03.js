// Part 1. Get gamma and epsilon

const getGamma = (codes) => {
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


const fs = require('fs');


fs.readFile('./data/day03.txt',  (err, data) => { 
  if (err) throw err; 

  const str = data.toString().split("\n");

  // console.log(directions.slice(directions.length - 5));
  // console.log(getPosition(directions));
  console.log(getGamma(str));

})
