// Part 1. count the number of increased depth
const countIncreasedDepth = (array) => {
  let length = array.length;
  let count = 0;
  for (let i = 0; i < length - 1; i++) {
    if (array[i+1] - array[i] > 0) {
      count++;
    }
  }

  return count;

}

const countIncreasedDepthBy3 = (array) => {
  let length = array.length;
  let count = 0;
  for (let i = 2; i < length - 1; i++) {
    if ((array[i+1] > array[i-2]) > 0) {
      count++;
    }
  }

  return count;

}




const fs = require('fs');

fs.readFile('./data/day01.txt',  (err, data) => { 
  if (err) throw err; 

  const str = data.toString().split("\n");
  const numbers = [];
  for (let item of str) {
    numbers.push(Number(item));
  }
  console.log(countIncreasedDepth(numbers));
  console.log(countIncreasedDepthBy3(numbers));
})

