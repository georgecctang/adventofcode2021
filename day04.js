// const numbers = [7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1];

// let firstNumberIndex = 0;
// while (firstNumberIndex < numbers.length) {
//   if (firstNumberIndex === 0) {
//     console.log(numbers.slice(firstNumberIndex,5));
//     firstNumberIndex += 5;
//   } else {
//     console.log(numbers.slice(firstNumberIndex, firstNumberIndex + 6));
//     firstNumberIndex += 6;
//   }

// }




const fs = require('fs');

fs.readFile('./data/day04-bingo-cards-test.txt',  (err, data) => { 
  if (err) throw err; 
  const str = data
    .toString().split('\n')
    .filter(item => item !== "")
    .map(item => item.split("\\s+"))
    .map(item => item[0])
    .map(item => item.split(' ').filter(item => item !== "").map(item => Number(item)));


    const bingoData = [];
  let bingoCard = [];
  for (let i = 0; i < str.length; i++) {
    bingoCard.push(str[i]);
    if (i % 5 === 4) {
      bingoData.push(bingoCard);
      bingoCard = [];
    }
  }

  console.log(bingoData);
});