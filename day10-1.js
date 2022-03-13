const checkSyntax = (syntax) => {
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
        isError = true;
        return syntax[i];
      }
    }
    i++;
  }
  return "";
}



const fs = require('fs');

fs.readFile('./data/day10.txt',  (err, data) => { 
  if (err) throw err; 
  const str = data.toString();
  const parenthesis = str.split('\n');
  // console.log(parenthesis);
  const syntaxValueObject = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137
  }

  const syntaxErrors = parenthesis
    .map(syntax => checkSyntax(syntax)).filter(result => result)
    .map(syntax => syntaxValueObject[syntax])
    .reduce((a,b) => a+b);
  console.log(syntaxErrors);
});