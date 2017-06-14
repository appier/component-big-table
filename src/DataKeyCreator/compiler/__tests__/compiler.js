import compiler from '../index';
import { fromJS } from 'immutable';

const data = {
  cost: 100,
  impression: 6000,
  click: 300,
  action: 2,
};

const immutableData = fromJS(data);

describe('Compiler', () => {

  it('Empty', () => {
    expect(compiler('')(data)).toMatchSnapshot();
  })

  it('Number', () => {
    expect(compiler('1')(data)).toMatchSnapshot();
  })

  it('Identifier', () => {
    expect(compiler('cost')(data)).toMatchSnapshot();
  })

  it('BinaryExpression: Number', () => {
    expect(compiler('1+2')(data)).toMatchSnapshot();
  })

  it('BinaryExpression: Number, Identifier', () => {
    expect(compiler('1+cost')(data)).toMatchSnapshot();
  })

  it('BinaryExpression: Identifier, Identifier', () => {
    expect(compiler('action/cost')(data)).toMatchSnapshot();
  })

  it('Paren: Number', () => {
    expect(compiler('(1+2)')(data)).toMatchSnapshot();
  })

  it('Paren: Number 2', () => {
    expect(compiler('(1+2)*3')(data)).toMatchSnapshot();
  })

  it('Paren: Number, Identifier', () => {
    expect(compiler('(1+action) / cost')(data)).toMatchSnapshot();
  })

  it('Support Immutable', () => {
    expect(compiler('(1+action) / cost')(immutableData)).toMatchSnapshot();
  })

  it('Support Immutable 2', () => {
    expect(compiler(' ( 1+action) / (cost - 20)')(immutableData)).toMatchSnapshot();
  })

  it('Error Handlering: tokenizer error', () => {
    expect(compiler('1 && 2')(data)).toMatchSnapshot();
  })

  it('Error Handlering: tokenizer error 2', () => {
    expect(compiler('1 + 2 )')(data)).toMatchSnapshot();
  })

  it('Error Handlering: tokenizer error 3', () => {
    expect(compiler('action cost +')(data)).toMatchSnapshot();
  })

  it('Error Handlering: parser error', () => {
    expect(compiler('((1+2)')(data)).toMatchSnapshot();
  })

  it('Error Handlering: evaluator error', () => {
    expect(compiler('1 + aa')(data)).toMatchSnapshot();
  })


});