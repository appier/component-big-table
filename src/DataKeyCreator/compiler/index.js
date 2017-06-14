import tokenizer from './tokenizer';
import parser from './parser';
import evaluator from './evaluator';

export const compiler = expr => variable => {

  try {
    const tokens = tokenizer(expr);
    const ast = parser(tokens);
    const values = evaluator(ast)(variable);
    if(values.length === 1 && values[0]){
      return {
        success: true,
        value: values[0],
      }
    }
    return {
      success: false,
      err: 'Expression is not valid',
    }
  } catch(err) {
    return {
      success: false,
      err: String(err),
    }
  }

}




export default compiler;