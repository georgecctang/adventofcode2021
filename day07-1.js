const fs = require('fs');

const calcDistance = (positions, position) => {
  let distance = 0;
  for (let i = 0; i < positions.length; i++) {
    distance += Math.abs(positions[i] - position);
  }
  return distance;
}


const findMinDistance = (positions) => {
  let left = positions.reduce((a,b) => a < b ? a: b);
  let right = positions.reduce((a,b) => a > b ? a: b);
  let leftDistance  = calcDistance(positions, left); 
  let rightDistance  = calcDistance(positions, right); 
  while (right - left > 1) {
    console.log([left, leftDistance, right, rightDistance]);
    if (rightDistance > leftDistance) {
      right = Math.round(left + (right - left) / 2);
      rightDistance = calcDistance(positions, right);
    } else {
      left = Math.round(left + (right - left) / 2);
      leftDistance = calcDistance(positions, left);
    }
    console.log('diff', right - left);
  }
  return leftDistance < rightDistance ? [left, leftDistance] : [right, rightDistance];
}



fs.readFile('./data/day07.txt',  (err, data) => { 
  if (err) throw err; 
  const str = data.toString();
  let positions = str.split(',').map(n => Number(n));
  console.log(findMinDistance(positions));
});