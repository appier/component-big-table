import React from 'react';
import { Map, List } from 'immutable';

import RowWrap from './RowWrap';

export default class ColWrap extends React.PureComponent {
  static defaultProps = {
    widthPadding: 0,
    height: 0,
    dataKey: List(),
    data: Map(),
  };

  render() {
    const { props } = this;
    const { widthPadding, height, dataKey, data } = props;

    return (
      <div className="bt-col">
        {dataKey.map((d, j) =>
          <RowWrap
            key={j}
            widthPadding={widthPadding}
            height={height}
            data={data}
            d={d}
          />
        )}
      </div>
    );
  }
}
