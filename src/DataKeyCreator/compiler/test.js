import tokenizer from './tokenizer';
import parser from './parser';
import evaluator from './evaluator';


console.log(tokenizer('a b +'));

let ast = null;
let value = null;
// ast = parser([
//   { type: 'identifier', value: 'cost' }
// ]);
// console.log(JSON.stringify(ast, null, 2));

// ast = parser([
//   { type: 'identifier', value: 'action' },
//   { type: 'operator', value: '*' },
//   { type: 'identifier', value: 'cost' }
// ]);
// console.log(JSON.stringify(ast, null, 2));


// ast = parser([
//   { type: 'number', value: '3' },
//   { type: 'operator', value: '+' },
//   { type: 'number', value: '2' }
// ]);
// console.log(JSON.stringify(ast, null, 2));


// ast = parser([
//   { type: 'number', value: '1' },
//   { type: 'operator', value: '*' },
//   { type: 'number', value: '2' },
//   { type: 'operator', value: '*' },
//   { type: 'number', value: '3' }
// ]);
// console.log(JSON.stringify(ast, null, 2));



// ast = parser([
//   { type: 'number', value: '1' },
//   { type: 'operator', value: '*' },
//   { type: 'number', value: '2' },
//   { type: 'operator', value: '+' },
//   { type: 'number', value: '3' },
//   { type: 'operator', value: '*' },
//   { type: 'number', value: '4' },
// ]);
// console.log(JSON.stringify(ast, null, 2));



// ast = parser([
//   { type: 'number', value: '1' },
//   { type: 'operator', value: '+' },
//   { type: 'number', value: '2' },
//   { type: 'operator', value: '*' },
//   { type: 'number', value: '3' },
//   { type: 'operator', value: '-' },
//   { type: 'number', value: '4' },
//   { type: 'operator', value: '/' },
//   { type: 'number', value: '5' }
// ]);
// console.log(JSON.stringify(ast, null, 2));


// ast = parser([
//   { type: 'number', value: '1' },
//   { type: 'operator', value: '*' },
//   { type: 'paren', value: '(' },
//   { type: 'number', value: '2' },
//   { type: 'operator', value: '+' },
//   { type: 'number', value: '3' },
//   { type: 'paren', value: ')' },
// ]);
// console.log(JSON.stringify(ast, null, 2));

// ast = parser([
//   { type: 'paren', value: '(' },
//   { type: 'number', value: '1' },
//   { type: 'operator', value: '+' },
//   { type: 'number', value: '2' },
//   { type: 'paren', value: ')' },
//   { type: 'operator', value: '*' },
//   { type: 'paren', value: '(' },
//   { type: 'number', value: '2' },
//   { type: 'operator', value: '+' },
//   { type: 'number', value: '3' },
//   { type: 'paren', value: ')' },
// ]);
// console.log(JSON.stringify(ast, null, 2));

// ast = parser([
//   { type: 'number', value: '1' },
//   { type: 'operator', value: '+' },
//   { type: 'number', value: '2' },
// ]);
// console.log(JSON.stringify(ast, null, 2));


ast = parser([
  { type: 'identifier', value: 'a' },
  { type: 'identifier', value: 'b' },
  { type: 'operator', value: '+' }
]);
console.log(JSON.stringify(ast, null, 2));


// ast = parser([
//   { type: 'number', value: '3' },
//   { type: 'operator', value: '+' },
//   { type: 'number', value: '2' }
// ]);

// ast = parser([
//     { type: 'paren', value: '(' },
//     { type: 'identifier', value: 'impression' },
//     { type: 'operator', value: '+' },
//     { type: 'identifier', value: 'click' },
//     { type: 'paren', value: ')' },
//     { type: 'operator', value: '/' },
//     { type: 'paren', value: '(' },
//     { type: 'identifier', value: 'cost' },
//     { type: 'operator', value: '+' },
//     { type: 'identifier', value: 'action' },
//     { type: 'paren', value: ')' },
// ]);
// value = evaluator(ast)({
//   cost: 100,
//   impression: 6000,
//   click: 300,
//   action: 2,
// })


// console.log(JSON.stringify(ast, null, 2));
// console.log('---------------')
// console.log('value: ', value)
// console.log('---------------')



