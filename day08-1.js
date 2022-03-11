const fs = require('fs');

fs.readFile('./data/day08.txt',  (err, data) => { 
  if (err) throw err; 
  const str = data.toString();
  let signals = str.split('\n').map(str => str.split('|')[1].trim()).map(str => str.split(' '));
  const count = signals.flat().filter(str => [2,3,4,7].includes(str.length)).length;
  console.log(count);
});