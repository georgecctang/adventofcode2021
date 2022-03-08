const fs = require('fs');

fs.readFile('./data/day05-test.txt',  (err, data) => { 
  if (err) throw err; 

  const str = data.toString().split("\n");

  const paths = str
    .map(item => item.split(' -> '))
    .map(item => [item[0].split(','),item[1].split(',')])
    .map(item => [item[0].map(n => Number(n)),item[1].map(n => Number(n))])
  ;

  const pathsVHOnly = paths.filter(points => points[0][0] === points[1][0] || points[0][1] === points[1][1])

  console.log(pathsVHOnly);
});