// Part 1 
// using array is memory intensive

// const increaseFish = (fish) => {
//   let output = fish;
//   // count how many zeroes
//   let zeroes = output.filter(n => n === 0).length;
//   // minus one (non zeroes) or change to 6 (zeroes)
//   output = output.map(n => n > 0 ? n - 1 : 6);
//   // add the new fishes
//   output = [...output, ...Array(zeroes).fill(8)];
//   return output;
// }

// Part 2

const increaseFish = (fish) => {
  const data = fish;
  for (let i = 0; i <= 8; i++) {
    if (!data[i]) {
      data[i] = 0;
    }
  }
  const zeroes = data[0];
  for (let i = 0; i < 8; i++) {
    data[i] = data[i + 1];
  }
  data[8] = zeroes;
  data[6] = data[6] + zeroes;
  return data;
}

const fs = require('fs');

fs.readFile('./data/day06.txt',  (err, data) => { 
  if (err) throw err; 

  const str = data.toString();
  let fishData = str.split(',').map(n => Number(n));

  let fish = {};
  for (let n of fishData) {
    if (!fish[n]) {
      fish[n] = 1;
    } else {
      fish[n]++;
    }
  }

  for (let day = 0; day < 256; day++) {
    // console.log(fish);
    fish = increaseFish(fish);
  }
  console.log(Object.values(fish).reduce((a, b) => a + b));
})