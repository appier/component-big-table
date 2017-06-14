import React from 'react';
import { Map, List } from 'immutable';

import FixedCol from './FixedCol';
import ColWrap from './ColWrap';

import { MetaData } from './util';

import './table.css';

export default class Row extends React.PureComponent {
  static defaultProps = {
    metaData: new MetaData(),
    data: Map(),
    offset: 0,
    width: 640,
    widthPadding: 0,
    height: 20,
    style: {},
    modifier: null,
  };

  render() {
    const { props } = this;
    const {
      metaData,
      data,
      width,
      widthPadding,
      height,
      offset,
      style,
      modifier,
    } = props;

    const {
      fixedColDataKey,
      fluidColDataKey,
      fixedColWidth,
      fluidColWidth,
      visibleWidth,
    } = metaData;

    let $ret = (
      <div
        className="bt-row"
        style={{
          width,
          height,
          ...style,
        }}
      >
        <FixedCol width={fixedColWidth} height={height} addShadow={offset > 0}>
          <ColWrap
            widthPadding={widthPadding}
            height={height}
            data={data}
            dataKey={fixedColDataKey}
          />
        </FixedCol>

        <div
          style={{
            position: 'absolute',
            transform: `translate3d(${-1 *
              offset *
              (fluidColWidth - visibleWidth) +
              fixedColWidth}px, 0px, 0px)`,
            width: fluidColWidth,
            height: height,
            zIndex: 1,
          }}
        >
          <ColWrap
            widthPadding={widthPadding}
            height={height}
            data={data}
            dataKey={fluidColDataKey}
          />
        </div>
      </div>
    );

    if (typeof modifier === 'function') {
      return modifier(data)($ret);
    } else {
      return $ret;
    }
  }
}
