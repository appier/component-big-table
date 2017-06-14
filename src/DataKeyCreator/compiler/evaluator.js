// evaluator accecpt an AST and variableMap
// and return evaulated value.

const evaluate = node => variable => {

  if(!node){
    throw `Expression is not valid`;
  }

  if(node.type === 'NumberLiteral'){
    return Number(node.value);
  }
  else if(node.type === 'Identifier'){
    //support Immutable
    let ret = null;
    if(typeof variable.get === 'function'){
      ret =  variable.get(node.value);
    }
    else{
      ret = variable[node.value];
    }

    if(ret){
      return ret;
    }
    throw `Unknown identifier: ${node.value}`;
  }
  else if(node.type === 'BinaryExpression'){
    if(node.operator === '+'){
      return evaluate(node.left)(variable) + evaluate(node.right)(variable);
    }
    else if(node.operator === '-'){
      return evaluate(node.left)(variable) - evaluate(node.right)(variable);
    }
    else if(node.operator === '*'){
      return evaluate(node.left)(variable) * evaluate(node.right)(variable);
    }
    else if(node.operator === '/'){
      return evaluate(node.left)(variable) / evaluate(node.right)(variable);
    }
  }
  else {
    throw `Unhandle AST Node: ${node.type}`;
  }
}

const evaluator = ast => variable => {
  return ast.body.map(d => {
    return evaluate(d)(variable);
  });
}

export default evaluator;

