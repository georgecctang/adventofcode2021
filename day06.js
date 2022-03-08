const increaseFish = (fish) => {
  let output = fish;
  // count how many zeroes
  let zeroes = output.filter(n => n === 0).length;
  // minus one (non zeroes) or change to 6 (zeroes)
  output = output.map(n => n > 0 ? n - 1 : 6);
  // add the new fishes
  output = [...output, ...Array(zeroes).fill(8)];
  return output;
}


const fs = require('fs');

fs.readFile('./data/day06.txt',  (err, data) => { 
  if (err) throw err; 

  const str = data.toString();
  let fish = str.split(',').map(n => Number(n));

  for (let day = 0; day < 80; day++) {
    // console.log(fish);
    fish = increaseFish(fish);
  }
  console.log(fish.length);
})