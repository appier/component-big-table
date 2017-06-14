const parser = (tokens) => {
  let position = 0;

  const additive = () => {
    let left = multiplicative();
    if(position < tokens.length){
      let token = tokens[position];
      // console.log('additive', position, token)
      while ( token && (token.value === '+' || token.value === '-' ) ) {
        position++;
        left = {
          type: 'BinaryExpression',
          left: left,
          operator: token.value,
          right: multiplicative()
        };
        token = tokens[position];
      }
    }
    return left;
  };

  const multiplicative = () => {
    let left = primay();
    if(position < tokens.length){
      let token = tokens[position];
      // console.log('multiplicative', position, token)
      while ( token && (token.value === '*' || token.value === '/') ) {
        position++;
        left = {
          type: 'BinaryExpression',
          operator: token.value,
          left: left,
          right: primay(),
        };
        token = tokens[position];
      }
    }
    return left;
  }

  const primay = () => {
    if(position < tokens.length){
      let token = tokens[position];
      let ret = null;
      // console.log('primay', position, token)
      if ( token.value === '(' ) {
        position++;
        ret = additive();
        token = tokens[position];
        // consume ')'
        if(token && token.value === ')') {
          position++;
        }
        else {
          throw 'Unmatched paren: it seems you lack a ) in expression';
        }
      }
      else if ( token.type === 'number' ) {
        position++;
        ret = {
          type: 'NumberLiteral',
          value: token.value,
        };
      }
      else if ( token.type === 'identifier' ) {
        position++;
        ret = {
          type: 'Identifier',
          value: token.value,
        };
      }
      else {
        throw 'Unexpected token: ' + token.value;
      }
      return ret;
    }
  }

  let body = [];
  while (position < tokens.length) {
    body.push(additive());
  }

  let ast = {
    type: 'Program',
    body: body,
  };

  return ast;
}

export default parser;