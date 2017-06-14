import React from 'react';
import { List, Map } from 'immutable';

import ExpressionInputer from './ExpressionInputer';

import { compiler } from './util';

import './dataKeyCreator.css';

class DataKeyCreator extends React.PureComponent {
  static defaultProps = {
    dataKey: List(),
    addDataExpr: () => {},
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      testData: this.getTestData(nextProps),
    });
  }

  getTestData = props => {
    return props.dataKey
      .reduce((acc, d) => {
        return acc.set(d.get('key'), 1);
      }, Map())
      .toJS();
  };

  updateEvaluator = expr => {
    this.setState({
      expr,
    });
  };

  validate = ({ keyName, expr, testData }) => {
    if (keyName === '') {
      return 'Key name cannot be empty';
    } else if (!/[a-z]+[a-z0-9]?/i.test(keyName)) {
      return 'Key name can only composed by english chars';
    } else if (testData[keyName]) {
      return 'Key name is duplicate';
    } else {
      const warning = compiler(expr)(testData);
      if (!warning.success) {
        return `Expression: ${warning.err}`;
      }
    }
    return null;
  };

  handleCreate = () => {
    const { keyName, expr, testData } = this.state;
    const warning = this.validate({ keyName, expr, testData });
    if (!warning) {
      this.props.addDataExpr({
        key: keyName,
        evaluate: compiler(expr),
      });
      this.setState({
        keyName: '',
        expr: '',
      });
    }
  };

  state = {
    keyName: '',
    expr: '',
    testData: this.getTestData(this.props),
  };

  render() {
    const { state, props } = this;
    const { onChange, dataKey } = props;

    const { keyName, expr, testData } = state;

    return (
      <div className="bt-data-key-creator">
        <div className="key-name-input">
          <span className="key-name-title1">Key Name:</span>
          <input
            value={keyName}
            onChange={e => this.setState({ keyName: e.target.value })}
          />
        </div>
        <ExpressionInputer
          title="Customized Key Experssion"
          expr={expr}
          onChange={this.updateEvaluator}
        />
        <div className="creator-warning">
          {this.validate({ keyName, expr, testData })}
        </div>
        <div className="create-btn" onClick={this.handleCreate}>
          Create
        </div>
      </div>
    );
  }
}

export default DataKeyCreator;
