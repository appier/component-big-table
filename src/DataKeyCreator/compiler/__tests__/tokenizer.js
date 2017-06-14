import tokenizer from '../tokenizer';

describe('Tokenizer', () => {

  it('identifier', () => {
    expect(tokenizer('cost')).toMatchSnapshot();
  });

  it('identifier with number', () => {
    expect(tokenizer('action1 / action2')).toMatchSnapshot();
  });

  it('operator', () => {
    expect(tokenizer('+ - * /')).toMatchSnapshot();
  });

  it('paren', () => {
    expect(tokenizer(')()')).toMatchSnapshot();
  });

  it('number', () => {
    expect(tokenizer('1 23 45')).toMatchSnapshot();
  });

  it('identifier & operator', () => {
    expect(tokenizer('cost / action')).toMatchSnapshot();
  });

  it('paren & identifier', () => {
    expect(tokenizer('cost ( action)')).toMatchSnapshot();
  });

  it('number & operator', () => {
    expect(tokenizer(' 1 + 2 * 3 - 4 / 5')).toMatchSnapshot();
  });

  it('identifier & number & operator', () => {
    expect(tokenizer(' impression * 1000 / cost ')).toMatchSnapshot();
  });

  it('identifier & paren & number & identifier', () => {
    expect(tokenizer('(impression + click)/(cost*5)')).toMatchSnapshot();
  });

  it('operator: invalid 1', () => {
    try {
      tokenizer('++')
    } catch (err) {
      expect(String(err)).toMatchSnapshot();
    }
  });

  it('operator: invalid 2', () => {
    try {
      tokenizer('**')
    } catch (err) {
      expect(String(err)).toMatchSnapshot();
    }
  });


})