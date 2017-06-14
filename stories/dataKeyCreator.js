import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { List, Map, Range, fromJS } from 'immutable';

import Table from '../src/TableBody/Table';

import ExpressionInputer from '../src/DataKeyCreator/ExpressionInputer';
import DataKeyCreator from '../src/DataKeyCreator/DataKeyCreator';

import {
  DEFAULT_SORT_FUNCTION,
  calculateMetaData,
} from '../src/TableBody/util';
import { compiler, tokenizer, parser } from '../src/DataKeyCreator/util';

const stories = storiesOf('DataKeyCreator', module);

const DEFAULT_DATA = (() => {
  return fromJS(
    Range(1, 11)
      .map(d => {
        return Map({
          id: d,
          name: 'long row name ' + d,
          cost: Math.ceil(Math.random() * 20 * d + d) / 100,
          impression: Math.ceil(Math.random() * 200 * d),
          click:
            Math.ceil(Math.random() * 4 * d) * Math.ceil(Math.random() * 5 * d),
          action: Math.ceil(Math.random() * 2 * d),
        });
      })
      .toJS()
  );
})();

stories.addWithInfo(
  'Token and AST Inspector',
  '',
  () => {
    const Host = React.createClass({
      getInitialState() {
        return {
          expr: '',
          tokens: [],
          ast: {},
          err: '',
        };
      },
      updateEvaluator(expr) {
        try {
          const tokens = tokenizer(expr);
          const ast = parser(tokens);
          this.setState({
            expr,
            tokens,
            ast,
            err: '',
          });
        } catch (err) {
          this.setState({
            expr,
            err: String(err),
          });
        }
      },
      render() {
        const { expr, tokens, ast, err } = this.state;

        return (
          <div className="tokens-ast-explorer">
            <div className="inputer" style={{ marginBottom: 16 }}>
              <ExpressionInputer
                title="Input Experssion"
                expr={expr}
                onChange={this.updateEvaluator}
              />
            </div>
            <div style={{ marginBottom: 16, color: '#f00' }}>{err}</div>
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  flex: 1,
                  margin: '0 8px',
                  padding: 16,
                  border: '1px solid #ddd',
                }}
              >
                <h1>Tokens</h1>
                <pre>
                  {JSON.stringify(tokens, null, 2)}
                </pre>
              </div>
              <div
                style={{
                  flex: 1,
                  margin: '0 8px',
                  padding: 16,
                  border: '1px solid #ddd',
                }}
              >
                <h1>AST</h1>
                <pre>
                  {JSON.stringify(ast, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        );
      },
    });

    return <Host />;
  },
  { inline: false, source: false }
);

stories.addWithInfo(
  'ExpressionInputer',
  '',
  () => {
    const DATA_KEY = List([
      'cost',
      'impression',
      'click',
      'action',
      'customKey',
    ]);

    const Host = React.createClass({
      getInitialState() {
        return {
          data: DEFAULT_DATA,
          expr: 'action/cost',
          evaluator: compiler('action/cost'),
        };
      },
      updateEvaluator(expr) {
        this.setState({
          expr,
          evaluator: compiler(expr),
        });
      },
      render() {
        const { data, expr, evaluator } = this.state;

        return (
          <div className="expression-inputer-example">
            <div className="inputer">
              <ExpressionInputer
                title="Customized Key Experssion"
                expr={expr}
                onChange={this.updateEvaluator}
                testData={data.get(0)}
              />
            </div>
            <div className="table">
              <div className="header">
                <div className="row">
                  {DATA_KEY.map(d => {
                    return <div key={d} className="col">{d}</div>;
                  })}
                </div>
              </div>
              <div className="body">
                {data.map((d, i) => {
                  return (
                    <div key={i} className="row">
                      {DATA_KEY.map(key => {
                        if (key === 'customKey') {
                          const result = evaluator(d);
                          let value = '-';
                          if (result.success) {
                            value = result.value.toFixed(2);
                          }
                          return (
                            <div key={key} className="col">
                              {value}
                            </div>
                          );
                        }
                        return (
                          <div key={key} className="col">
                            {d.get(key)}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      },
    });

    return <Host />;
  },
  { inline: false, source: false }
);

stories.addWithInfo(
  'DataKeyCreator',
  '',
  () => {
    const DEFAULT_DATA_KEY = fromJS([
      {
        key: 'cost',
        label: 'Cost',
        width: 100,
        sortable: true,
        adjustable: true,
      },
      {
        key: 'impression',
        label: 'Impression',
        width: 160,
        sortable: true,
        adjustable: true,
      },
      {
        key: 'click',
        label: 'Click',
        width: 80,
        sortable: true,
        adjustable: true,
      },
      {
        key: 'action',
        label: 'Action',
        width: 60,
        sortable: true,
        adjustable: true,
      },
    ]);

    const Host = React.createClass({
      getInitialState() {
        return {
          data: DEFAULT_DATA,
          dataKey: DEFAULT_DATA_KEY,
        };
      },
      updateDataKey(updater) {
        this.setState({ dataKey: updater(this.state.dataKey) });
      },
      addDataExpr({ key, evaluate }) {
        const dataKey = this.state.dataKey.push(
          Map({
            key: key,
            label: key,
            width: 100,
            sortable: true,
            adjustable: true,
          })
        );

        const data = this.state.data.map(d => {
          const ret = evaluate(d);
          if (ret.success) {
            return d.set(key, ret.value);
          }
          return d.set(key, '-');
        });

        this.setState({
          dataKey,
          data,
        });
      },
      render() {
        const { data, dataKey, expr, evaluator } = this.state;

        const viewHeight = 400;
        const viewWidth = 960;
        const scrollHeight = 18;
        const fixedKey = List();

        const {
          fixedColDataKey,
          fluidColDataKey,
          fixedColWidth,
          fluidColWidth,
          visibleWidth,
        } = calculateMetaData(viewWidth)(fixedKey)(dataKey);

        return (
          <div className="data-key-creator-example">
            <DataKeyCreator dataKey={dataKey} addDataExpr={this.addDataExpr} />
            <div
              className="table-with-hscroll"
              style={{
                position: 'relative',
                width: viewWidth,
                height: viewHeight,
              }}
            >
              <Table
                data={data}
                viewWidth={viewWidth}
                viewHeight={viewHeight}
                scrollTop={0}
                scrollLeft={0}
                fixedColDataKey={fixedColDataKey}
                fluidColDataKey={fluidColDataKey}
                fixedColWidth={fixedColWidth}
                fluidColWidth={fluidColWidth}
                visibleWidth={visibleWidth}
                updateDataKey={this.updateDataKey}
              />
            </div>
          </div>
        );
      },
    });

    return <Host />;
  },
  { inline: false, source: false }
);
