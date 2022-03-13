const checkSyntaxError = (syntax) => {
  const parenthesisMatches = {
    "{": "}",
    "[": "]",
    "(": ")",
    "<": ">"
  }

  const openStack = [];
  let i = 0; 
  let isError = false;
  
  while (i < syntax.length && !isError) {
    if (Object.keys(parenthesisMatches).includes(syntax[i])) {
      openStack.push(syntax[i]);
    } else {
      currentOpenParenthesis = openStack.pop(); 
      if (syntax[i] !== parenthesisMatches[currentOpenParenthesis]) {
        return true;
      }
    }
    i++;
  }
  return false;
}

const getRemainingSyntax = (syntax) => {
  const parenthesisMatches = {
    "{": "}",
    "[": "]",
    "(": ")",
    "<": ">"
  }

  const openStack = [];
  let i = 0; 
  let isError = false;
  
  while (i < syntax.length) {
    if (Object.keys(parenthesisMatches).includes(syntax[i])) {
      openStack.push(syntax[i]);
    } else {
      currentOpenParenthesis = openStack.pop(); 
    }
    i++;
  }
  
  return openStack.map(parenthesis => parenthesisMatches[parenthesis]).reverse();
}

const calculateScore = (syntaxList) => {
  const syntaxValueObject = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
  }
  let score = 0;
  for (let i = 0; i < syntaxList.length; i++) {
    score = score * 5 + syntaxValueObject[syntaxList[i]]; 
  }
  return score;
};

// console.log(calculateScore([
//   '}', '}', ']',
//   ']', ')', '}',
//   ')', ']'
// ]));

const fs = require('fs');

fs.readFile('./data/day10.txt',  (err, data) => { 
  if (err) throw err; 
  const str = data.toString();
  const parenthesis = str.split('\n');

  const syntaxWithErrors = parenthesis
    .filter(syntax => !checkSyntaxError(syntax))
    .map(syntax => getRemainingSyntax(syntax))
    .map(syntaxList => calculateScore(syntaxList))
    .sort((a,b) => a > b ? -1: 1);
    // .reduce((a,b) => a+b);
  console.log(syntaxWithErrors[(syntaxWithErrors.length - 1)/2]);
});