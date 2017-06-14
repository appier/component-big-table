import parser from '../parser';

describe('Parser', () => {

  it('identifier', () => {
    expect(parser(
      [
        { type: 'identifier', value: 'cost' }
      ]
    )).toMatchSnapshot();
  });

  it('BinaryExpression: identifier', () => {
    expect(parser(
      [
        { type: 'identifier', value: 'action' },
        { type: 'operator', value: '/' },
        { type: 'identifier', value: 'cost' }
      ]
    )).toMatchSnapshot();
  });

  it('BinaryExpression: number', () => {
    expect(parser(
      [
        { type: 'number', value: '1' },
        { type: 'operator', value: '*' },
        { type: 'number', value: '2' }
      ]
    )).toMatchSnapshot();
  });

  it('BinaryExpression: should able to chain', () => {
    expect(parser(
      [
        { type: 'number', value: '1' },
        { type: 'operator', value: '*' },
        { type: 'number', value: '2' },
        { type: 'operator', value: '*' },
        { type: 'number', value: '3' },
      ]
    )).toMatchSnapshot();
  });

  it('BinaryExpression: operator should have precedence', () => {
    // 1 + 2 * 3
    expect(parser(
      [
        { type: 'number', value: '1' },
        { type: 'operator', value: '+' },
        { type: 'number', value: '2' },
        { type: 'operator', value: '*' },
        { type: 'number', value: '3' }
      ]
    )).toMatchSnapshot();
  });

  it('BinaryExpression: operator should have precedence 2', () => {
    // 1 * 2 + 3 * 4
    expect(parser(
      [
        { type: 'number', value: '1' },
        { type: 'operator', value: '*' },
        { type: 'number', value: '2' },
        { type: 'operator', value: '+' },
        { type: 'number', value: '3' },
        { type: 'operator', value: '*' },
        { type: 'number', value: '4' },
      ]
    )).toMatchSnapshot();
  });


  it('BinaryExpression: operator should have precedence 3', () => {
     // 1 + 2 * 3 - 4 / 5 => 1 + ( 2 * 3 ) - ( 4 / 5 )
    expect(parser(
      [
        { type: 'number', value: '1' },
        { type: 'operator', value: '+' },
        { type: 'number', value: '2' },
        { type: 'operator', value: '*' },
        { type: 'number', value: '3' },
        { type: 'operator', value: '-' },
        { type: 'number', value: '4' },
        { type: 'operator', value: '/' },
        { type: 'number', value: '5' }
      ]
    )).toMatchSnapshot();
  });

  it('Parn Handling: basic', () => {
     // ( 1 + 2 )
    expect(parser(
      [
        { type: 'paren', value: '(' },
        { type: 'number', value: '1' },
        { type: 'operator', value: '+' },
        { type: 'number', value: '2' },
        { type: 'paren', value: ')' },
      ]
    )).toMatchSnapshot();
  });

  it('Parn Handling: paren precedence', () => {
     // 1 * ( 2 + 3 )
    expect(parser(
      [
        { type: 'number', value: '1' },
        { type: 'operator', value: '*' },
        { type: 'paren', value: '(' },
        { type: 'number', value: '2' },
        { type: 'operator', value: '+' },
        { type: 'number', value: '3' },
        { type: 'paren', value: ')' },
      ]
    )).toMatchSnapshot();
  });

  it('Parn Handling: paren precedence 2', () => {
     // ( 1 + 2 )  * ( 2 + 3 )
    expect(parser(
      [
        { type: 'paren', value: '(' },
        { type: 'number', value: '1' },
        { type: 'operator', value: '+' },
        { type: 'number', value: '2' },
        { type: 'paren', value: ')' },
        { type: 'operator', value: '*' },
        { type: 'paren', value: '(' },
        { type: 'number', value: '2' },
        { type: 'operator', value: '+' },
        { type: 'number', value: '3' },
        { type: 'paren', value: ')' },
      ]
    )).toMatchSnapshot();
  });

  it('Parn Handling: nested paren', () => {
     // ( ( 1 + 2 ) + 3)
    expect(parser(
      [
        { type: 'paren', value: '(' },
        { type: 'paren', value: '(' },
        { type: 'number', value: '1' },
        { type: 'operator', value: '+' },
        { type: 'number', value: '2' },
        { type: 'paren', value: ')' },
        { type: 'operator', value: '+' },
        { type: 'number', value: '3' },
        { type: 'paren', value: ')' },
      ]
    )).toMatchSnapshot();
  });

  it('Parn Handling: nested paren 2', () => {
     // ( 1 + ( 2 + 3 ) )
    expect(parser(
      [
        { type: 'paren', value: '(' },
        { type: 'number', value: '1' },
        { type: 'operator', value: '+' },
        { type: 'paren', value: '(' },
        { type: 'number', value: '2' },
        { type: 'operator', value: '+' },
        { type: 'number', value: '3' },
        { type: 'paren', value: ')' },
        { type: 'paren', value: ')' },
      ]
    )).toMatchSnapshot();
  });

  it('Parn Error: no close paren', () => {
     // ( 1 + 2
    try {
      expect(parser(
        [
          { type: 'paren', value: '(' },
          { type: 'number', value: '1' },
          { type: 'operator', value: '+' },
          { type: 'number', value: '2' },
        ]
      ))
    } catch (err) {
      expect(String(err)).toMatchSnapshot();
    }
  });

  it('Parn Error: no close paren', () => {
     // ( 1 + 2 * ( 2 + 3 )
    try {
      expect(parser(
        [
          { type: 'paren', value: '(' },
          { type: 'number', value: '1' },
          { type: 'operator', value: '+' },
          { type: 'number', value: '2' },
          { type: 'operator', value: '*' },
          { type: 'paren', value: '(' },
          { type: 'number', value: '2' },
          { type: 'operator', value: '+' },
          { type: 'number', value: '3' },
          { type: 'paren', value: ')' },
        ]
      ))
    } catch (err) {
      expect(String(err)).toMatchSnapshot();
    }
  });


});

