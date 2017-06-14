
const WHITESPACE_TEST = /\s/;
const NUMBERS_TEST = /[0-9]/;
const OPERATOR_TEST = /[\-+*/]/;
const IDENTIFIER_HEAD_TEST = /[a-z]/i;
const IDENTIFIER_TEST = /[a-z0-9_\-]/i;

const tokenizer = (input) => {

  let position = 0;
  let tokens = [];

  while(position < input.length){
    let char = input[position];

    if (char === '(') {
      tokens.push({
        type: 'paren',
        value: '(',
      });
      position++;
      continue;
    }

    if (char === ')') {
      tokens.push({
        type: 'paren',
        value: ')',
      });
      position++;
      continue;
    }

    //ignore white space..
    if (WHITESPACE_TEST.test(char)) {
      position++;
      continue;
    }

    //abstract identifier
    if (IDENTIFIER_HEAD_TEST.test(char)) {
      let value = '';
      while (
        (IDENTIFIER_TEST.test(char) || NUMBERS_TEST.test(char))
        && position < input.length
      ) {
        value += char;
        char = input[++position];
      }
      tokens.push({
        type: 'identifier',
        value: value
      });
      continue;
    }

    //abstract number
    if(NUMBERS_TEST.test(char)) {
      let value = '';
      while (NUMBERS_TEST.test(char) && position < input.length) {
        value += char;
        char = input[++position];
      }
      tokens.push({
        type: 'number',
        value: value
      });
      continue;
    }

    //abstract operator
    if(OPERATOR_TEST.test(char)) {
      let value = '';
      while (OPERATOR_TEST.test(char) && position < input.length) {
        value += char;
        char = input[++position];
        if(value.length >= 2){
          throw new TypeError('illegal operator: '+ value);
        }
      }
      tokens.push({
        type: 'operator',
        value: value
      });
      continue;
    }


    throw new TypeError('Unable to parse character: ' + char);
  }

  return tokens;
};

export default tokenizer;