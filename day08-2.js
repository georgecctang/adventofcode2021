const fs = require('fs');

const sortAlphabets = (alphabets) => {
  return alphabets.split('').sort().join('')
} 

// const sortSignals = (signals) => {
//   return signals.map(signal => sortAlphabets(signal));
// }

const countOccurence = (signals, char) => {
  let count = 0;
  let characters = signals.join('');
  for (let i = 0; i < characters.length; i++) {
    if (characters[i] === char) {
      count++;
    }
  }
  return count;
}

const calcValue = (input) => {
  let wirings = input.split("|")[0].trim().split(' ').map(wiring => sortAlphabets(wiring));
  let signals = input.split("|")[1].trim().split(' ').map(signal => sortAlphabets(signal));
  
  const signalObj = {};
  const one = wirings.filter(signal => signal.length === 2)[0];
  const four = wirings.filter(signal => signal.length === 4)[0];
  const seven = wirings.filter(signal => signal.length === 3)[0];
  const eight = wirings.filter(signal => signal.length === 7)[0];

  signalObj[one] = '1';
  signalObj[four] = '4';
  signalObj[seven] = '7';
  signalObj[eight] = '8';

  const loc3 = countOccurence(wirings, one[0]) === 8 ? one[0]: one[1];
  const loc6 = countOccurence(wirings, one[0]) === 9 ? one[0]: one[1];
  const two = wirings.filter(signal => signal.length === 5 && signal.includes(loc3) && !signal.includes(loc6));
  const three = wirings.filter(signal => signal.length === 5 && signal.includes(loc3) && signal.includes(loc6));
  const five = wirings.filter(signal => signal.length === 5 && !signal.includes(loc3) && signal.includes(loc6));
  const six = wirings.filter(signal => signal.length === 6 && !signal.includes(loc3));
  const nine = wirings.filter(signal => signal.length === 6 && [...four].every(char => signal.includes(char)));
  signalObj[two] = '2';
  signalObj[three] = '3';
  signalObj[five] = '5';
  signalObj[six] = '6';
  signalObj[nine] = '9';
  const zero = wirings.filter(signal => !Object.keys(signalObj).includes(signal))[0];
  signalObj[zero] = '0';
  // return signalObj;
  return Number(signals.map(signal => signalObj[signal]).join(''));
} 

fs.readFile('./data/day08.txt',  (err, data) => { 
  if (err) throw err; 
  const str = data.toString();
  let wiringAndSignals = str.split('\n');
  let sum = 0;
  for (let i = 0; i < wiringAndSignals.length; i++) {
    sum += calcValue(wiringAndSignals[i]);
  }
  console.log(sum);
});