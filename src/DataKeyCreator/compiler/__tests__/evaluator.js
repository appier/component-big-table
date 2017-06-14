import evaluator from '../evaluator';

const data = {
  cost: 100,
  impression: 6000,
  click: 300,
  action: 2,
};

describe('Evaluator', () => {

  it('Number', () => {
    expect(
      evaluator({
        type: 'Program',
        body: [
          {
            type: 'NumberLiteral',
            value: '2'
          }
        ]
      })(data)
    ).toMatchSnapshot();
  });

  it('Identifier', () => {
    expect(
      evaluator({
        type: 'Program',
        body: [
          {
            type: 'Identifier',
            value: 'cost'
          }
        ]
      })(data)
    ).toMatchSnapshot();
  });

  it('BinaryExpression: Number', () => {
    expect(
      evaluator({
        type: 'Program',
        body: [
          {
            type: 'BinaryExpression',
            left: {
              type: 'NumberLiteral',
              value: '3'
            },
            operator: '+',
            right: {
              type: 'NumberLiteral',
              value: '2'
            }
          }
        ]
      })(data)
    ).toMatchSnapshot();
  });

  it('BinaryExpression: Number, Identifier', () => {
    expect(
      evaluator({
        type: 'Program',
        body: [
          {
            type: 'BinaryExpression',
            left: {
              type: 'NumberLiteral',
              value: '1'
            },
            operator: '+',
            right: {
              type: 'Identifier',
              value: 'cost'
            }
          }
        ]
      })(data)
    ).toMatchSnapshot();
  });

  it('BinaryExpression: Identifier, Identifier', () => {
    expect(
      evaluator({
        type: 'Program',
        body: [
          {
            type: 'BinaryExpression',
            left: {
              type: 'Identifier',
              value: 'cost'
            },
            operator: '/',
            right: {
              type: 'Identifier',
              value: 'action'
            }
          }
        ]
      })(data)
    ).toMatchSnapshot();
  });

  it('BinaryExpression: Paren ', () => {
    expect(
      evaluator({
        type: 'Program',
        body: [
          {
            type: 'BinaryExpression',
            operator: '*',
            left: {
              type: 'NumberLiteral',
              value: '1'
            },
            right: {
              type: 'BinaryExpression',
              left: {
                type: 'NumberLiteral',
                value: '2'
              },
              operator: '+',
              right: {
                type: 'NumberLiteral',
                value: "3"
              }
            }
          }
        ]
      })(data)
    ).toMatchSnapshot();
  });

  it('BinaryExpression: Paren 2', () => {
    expect(
      evaluator({
        type: 'Program',
        body: [
          {
            type: 'BinaryExpression',
            operator: '/',
            left: {
              type: 'BinaryExpression',
              left: {
                type: 'Identifier',
                value: 'impression'
              },
              operator: '+',
              right: {
                type: 'Identifier',
                value: 'click'
              }
            },
            right: {
              type: 'BinaryExpression',
              left: {
                type: 'Identifier',
                value: 'cost'
              },
              operator: '+',
              right: {
                type: 'Identifier',
                value: 'action'
              }
            }
          }
        ]
      })(data)
    ).toMatchSnapshot();
  });


});