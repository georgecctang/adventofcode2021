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

// const testBingoCard =   [
//   [ '22', '13', '17', '11', '0' ],
//   [ '8', '2', '23', '4', '24' ],
//   [ '21', '9', '14', '16', '7' ],
//   [ '6', '10', '3', '18', '5' ],
//   [ '1', '12', '20', '15', '19' ]
// ];

// Part 1

// function to mark bingo card with x based on number
const markBingoCard = (number, bingoCard) => {
  const markedBingoCard = bingoCard;
  let bingoCardDim = bingoCard.length; // assume equal number accross and down
  console.log(bingoCardDim);
  for (let down = 0; down < bingoCardDim; down++) {
    for (let across = 0; across < bingoCardDim; across++) {
      if (bingoCard[down][across] === number) {
          markedBingoCard[down][across] = "x";
      }
    }
  }
  return markedBingoCard;
}

// console.log(markBingoCard('19', testBingoCard));
// console.log(testBingoCard);



  

const checkBingo = (bingoCard) => {
  const bingoCardDim = bingoCard.length;
  
  // check across
  for (let i = 0; i < bingoCardDim; i++) {
    if (bingoCard[i].every(item => item === 'x')) {
      return true;
    }
  }
  // check down
  for (let i = 0; i < bingoCardDim; i++) {
    const downNumbers = [];
    for (let j = 0; j < bingoCardDim; j++) {
      downNumbers.push(bingoCard[j][i]);      
    }
    if (downNumbers.every(number => number === 'x')) {
      return true;
    }
  }

  // check diagonal (top left to bottom right)
  const diagonalNumbers1 = []
  for (let i = 0; i < bingoCardDim; i++) {
    diagonalNumbers1.push(bingoCard[i][i]);
  }
  if (diagonalNumbers1.every(number => number === 'x')) {
    return true;
  }
  // check diagonal (top right to bottom left)
  const diagonalNumbers2 = []
  for (let i = 0; i < bingoCardDim; i++) {
    diagonalNumbers2.push(bingoCard[bingoCardDim - 1 - i][i]);
  }
  if (diagonalNumbers2.every(number => number === 'x')) {
    return true;
  }
  return false;
}

const testBingoCard =   [
  [ 'x', '13', '17', '11', '0' ],
  [ 'x', 'x', '23', '4', '24' ],
  [ '23', 'x', 'x', '16', '7' ],
  [ 'x', '10', '3', '4', '5' ],
  [ 'x', '12', '20', '15', 'x' ]
];

console.log(checkBingo(testBingoCard));



// const fs = require('fs');

// fs.readFile('./data/day04-bingo-cards-test.txt',  (err, data) => { 
//   if (err) throw err; 
//   const str = data
//     .toString().split('\n')
//     .filter(item => item !== "")
//     .map(item => item.trim().split(/\s+/))

//     // console.log(str);

//     const bingoData = [];
//   let bingoCard = [];
//   for (let i = 0; i < str.length; i++) {
//     bingoCard.push(str[i]);
//     if (i % 5 === 4) {
//       bingoData.push(bingoCard);
//       bingoCard = [];
//     }
//   }

//   console.log(bingoData);
// });