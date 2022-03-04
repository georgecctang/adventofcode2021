// Part 1 Get position
const getPosition = (directions) => {
  let h = 0;
  let v = 0;

  for (let direction of directions) {
    if (direction[0] === 'forward') {
      h = h + direction[1];
    } else if (direction[0] === 'down') {
      v = v + direction[1];
    } else {
      v = v - direction[1];
    }
    // console.log([h, v]);
  }
  return [h, v];
};

// Part 2 Get position with aim
const getPositionAim = (directions) => {
  let h = 0;
  let v = 0;
  let aim = 0;

  for (let direction of directions) {
    if (direction[0] === 'forward') {
      v = v + direction[1] * aim;
      h = h + direction[1];
    } else if (direction[0] === 'down') {
      aim = aim + direction[1];
    } else {
      aim = aim - direction[1];
    }
    // console.log([h, v]);
    // console.log([h,v, aim]);
  }
  return [h, v];
};


const fs = require('fs');

fs.readFile('./data/day02.txt',  (err, data) => { 
  if (err) throw err; 

  const str = data.toString().split("\n");
  const directions = [];
  for (let item of str) {
    let direction = item.split(" ");
    direction[1] = Number(direction[1]);
    directions.push(direction);

  }
  // console.log(directions.slice(directions.length - 5));
  // console.log(getPosition(directions));
  console.log(getPositionAim(directions));

})
