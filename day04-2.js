// Part 2

const getNumbers = (firstNumberIndex, numbers) => {
  if (firstNumberIndex === 0) {
    return numbers.slice(firstNumberIndex, firstNumberIndex + 5)
  } else {
    return numbers.slice(firstNumberIndex, firstNumberIndex + 6)
  }
};

// function to mark bingo card with x based on number
const markBingoCard = (number, bingoCard) => {
  const markedBingoCard = bingoCard;
  let bingoCardDim = bingoCard.length; // assume equal number accross and down
  for (let down = 0; down < bingoCardDim; down++) {
    for (let across = 0; across < bingoCardDim; across++) {
      if (bingoCard[down][across] === number) {
          markedBingoCard[down][across] = "x";
      }
    }
  }
  return markedBingoCard;
}

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

  return false;
}

const calculateBingoSum = bingoCard => {
  return bingoCard.flat().map(item => Number(item)).filter(item => !isNaN(item)).reduce((a,b) => a + b);
}


const testBingoCard =   [
  [ 'x', '13', '17', '11', '0' ],
  [ 'x', 'x', '23', '4', '24' ],
  [ '23', 'x', 'x', '16', '7' ],
  [ 'x', '10', '3', '4', '5' ],
  [ 'x', 'x', 'x', 'x', 'x' ]
];


const fs = require('fs');

fs.readFile('./data/day04-numbers.txt',  (err, data) => { 
  if (err) throw err; 
  const numbers = data.toString().split(',');

  fs.readFile('./data/day04-bingo-cards.txt',  (err, data) => { 
    if (err) throw err; 
    const str = data
      .toString().split('\n')
      .filter(item => item !== "")
      .map(item => item.trim().split(/\s+/))

    const bingoCards = [];
    let tempBingoCard = [];
    for (let i = 0; i < str.length; i++) {
      tempBingoCard.push(str[i]);
      if (i % 5 === 4) {
        bingoCards.push(tempBingoCard);
        tempBingoCard = [];
      }
    }

    let firstNumberIndex = 0;
    let remainingBingoCards = {};
    for (let i = 0; i < bingoCards.length; i++) {
      remainingBingoCards[i] = true;
    }


    while (Object.keys(remainingBingoCards).length > 0 && firstNumberIndex < numbers.length) {
    // get numbers list
      let currentNumbers = getNumbers(firstNumberIndex, numbers); 
      console.log('currentNumbers', currentNumbers);
      let numberIndex = 0;
      while (numberIndex < currentNumbers.length && Object.keys(remainingBingoCards).length > 0) {

        let bingoCardIndex = 0;
        
        while (bingoCardIndex < bingoCards.length && Object.keys(remainingBingoCards).length > 0) {
          let bingoCard = bingoCards[bingoCardIndex];
          bingoCard = markBingoCard(currentNumbers[numberIndex],bingoCard);
          console.log('Card #', bingoCardIndex);
          console.log(bingoCard);
          if (checkBingo(bingoCard)) {
            delete remainingBingoCards[bingoCardIndex];
          } else {
            bingoCards[bingoCardIndex] = bingoCard;
          }
          if (Object.keys(remainingBingoCards).length === 0) {
            console.log('answer', 
            calculateBingoSum(bingoCards[bingoCardIndex]) *currentNumbers[numberIndex]);
          }
          bingoCardIndex++;
        }
          numberIndex++;
      }
      firstNumberIndex = firstNumberIndex === 0 ? firstNumberIndex + 5: firstNumberIndex + 6;
    }

  });
});