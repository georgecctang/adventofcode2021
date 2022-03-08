//  Part 1

const getPath = (points) => {
  let path = [];
  //horizontal line; same depth (1)
  if (points[0][1] === points[1][1]) {
    const depth = points[0][1];
    const left = points[0][0] <= points [1][0] ? points[0]: points[1];
    const right = points[0][0] > points [1][0] ?  points[0]: points[1];
    for (let i = left[0]; i <=right[0]; i++) {
      path.push([i,depth])
    }
  } 
  // vertical line; same shift (0)
  if (points[0][0] === points[1][0]) {
    const shift = points[0][0];
    const top = points[0][1] <= points [1][1] ? points[0]: points[1];
    const bottom = points[0][1] > points [1][1] ? points[0]: points[1];
    for (let i = top[1]; i <=bottom[1]; i++) {
      path.push([shift, i]);
    }
  }
  return path;
}

// console.log(getPath([[1,2],[1,7]]));

const fs = require('fs');

fs.readFile('./data/day05.txt',  (err, data) => { 
  if (err) throw err; 

  const str = data.toString().split("\n");

  const paths = str
    .map(item => item.split(' -> '))
    .map(item => [item[0].split(','),item[1].split(',')])
    .map(item => [item[0].map(n => Number(n)),item[1].map(n => Number(n))])
  ;

  const pathsVHOnly = paths.filter(points => points[0][0] === points[1][0] || points[0][1] === points[1][1])

  console.log(pathsVHOnly);
  let points = [];
  for (let endpoints of pathsVHOnly) {
    points = [...points, ...getPath(endpoints)];
  }
  const pointObj = {};
  for (let point of points) {
    if (!pointObj[point]) {
      pointObj[point] = 1;
    } else {
      pointObj[point] += 1;
    }
  }
  console.log(pointObj);
  console.log(Object.keys(pointObj).filter(point => pointObj[point] > 1).length);

});