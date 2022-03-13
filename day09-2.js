

const fs = require('fs');

fs.readFile('./data/day09.txt',  (err, data) => { 
  if (err) throw err; 
  const str = data.toString();
  const points = str.split('\n').map(line => [...line].map(n => Number(n)));
  
  const yLimit = points.length -1 ;
  const xLimit = points[0].length -1;
  let lowPointLocations = [];

  for (let y = 0; y <= yLimit; y++) {
    for (let x = 0; x <= xLimit; x++) {
      let adjacentLocations = [[y-1, x], [y+1, x], [y,x-1],[y,x+1]];
      adjacentLocations = adjacentLocations.filter(point => 
        (point[0] >= 0 && point[0] <= yLimit) && 
        (point[1] >=0 && point[1] <= xLimit));
      const adjacentPoints = adjacentLocations.map(([j,i]) => {
        return points[j][i]});
      if (adjacentPoints.every(point => point > points[y][x])) {
        lowPointLocations.push([y, x]);
      }
    }
  }
  // console.log(lowPointLocations);

  const getBasin = (points, y, x) => {
    const xLimit = points[0].length - 1;
    const yLimit = points.length - 1;
    // console.log('locations', y,x);
    if (x < 0 || x > xLimit) return 0;
    if (y < 0 || y > yLimit) return 0;
    if (coveredPoints[[y,x]]) return 0;
    if (points[y][x] === 9) return 0;
    coveredPoints[[y,x]] = true; 
    // console.log('value', points[y][x]);
    return 1 + getBasin(points, y+1, x) + getBasin(points, y-1, x) + getBasin(points, y, x+1) + getBasin(points, y, x-1) 
  }

  const coveredPoints = {};

  const top3BasinsProduct = lowPointLocations.map(([y,x]) => getBasin(points, y, x)).sort((a,b) => a > b ? -1 : 1).slice(0,3);

  console.log(top3BasinsProduct.reduce((a,b) => a*b));
  // console.log('total', total);
});