import React from 'react';
import { compiler } from './util';

class ExpressionInputer extends React.PureComponent {
  static defaultProps = {
    title: null,
    testData: null,
    expr: '',
    onChange: () => {},
  };

  render() {
    const { props } = this;
    const { title, expr, onChange, testData } = props;

    let evaluateWarning = null;

    if (testData) {
      evaluateWarning = compiler(expr)(testData);
    }

    return (
      <span className="bt-expression-input">
        {title ? <span className="input-title">{title}</span> : null}
        <input value={expr} onChange={e => onChange(e.target.value)} />
        {evaluateWarning && !evaluateWarning.success
          ? <span className="compiler-warning">
              {evaluateWarning.err}
            </span>
          : null}
      </span>
    );
  }
}

export default ExpressionInputer;
