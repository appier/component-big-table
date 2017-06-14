import React from 'react';
import { Map, List } from 'immutable';

import Cell from './Cell';

class RowWrap extends React.PureComponent {
  static defaultProps = {
    widthPadding: 0,
    height: 20,
    data: List(),
    d: Map(),
  };

  render() {
    const { data, widthPadding, height, d } = this.props;

    let $ret = data.get(d.get('key'));
    if (d.get('render')) {
      $ret = d.get('render')(data);
    }

    return (
      <Cell
        widthPadding={widthPadding}
        className={d.get('className')}
        key={d.get('key')}
        left={d.get('offset')}
        height={height}
        width={d.get('width')}
      >
        {$ret}
      </Cell>
    );
  }
}

export default RowWrap;
