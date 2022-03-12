const fs = require('fs');

fs.readFile('./data/day09.txt',  (err, data) => { 
  if (err) throw err; 
  const str = data.toString();
  const points = str.split('\n').map(line => [...line].map(n => Number(n)));
  
  let downMax = points.length - 1;
  let acrossMax = points[0].length - 1;
  
  let lowPoints = [];

  for (let down = 0; down <= downMax; down++) {
    for (let across = 0; across <= acrossMax; across++) {
      let adjacentLocations = [[down-1, across], [down+1, across], [down,across-1],[down,across+1]];
      // console.log(adjacentLocations);
      adjacentLocations = adjacentLocations.filter(point => 
        (point[0] >= 0 && point[0] <= downMax) && 
        (point[1] >=0 && point[1] <= acrossMax));
      const adjacentPoints = adjacentLocations.map(([y,x]) => points[y][x]);
      // console.log(adjacentPoints, points[down][across]);
      if (adjacentPoints.every(point => point > points[down][across])) {
        lowPoints.push(points[down][across]);
      }
    }
  }
  console.log(lowPoints.reduce((a,b)=> a+b) + lowPoints.length);
});
