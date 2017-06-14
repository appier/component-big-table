import React from 'react';
import { Map, List } from 'immutable';

import FixedCol from './FixedCol';
import ColWrap from './ColWrap';

import { MetaData } from './util';

import './table.css';

export default class Rows extends React.PureComponent {
  static defaultProps = {
    metaData: new MetaData(),
    data: List(),
    offset: 0,
    width: 640,
    widthPadding: 0,
    rowHeight: 20,
    rowHeightFn: null,
    style: {},
  };

  render() {
    const { props } = this;
    const {
      metaData,
      data,
      width,
      widthPadding,
      rowHeight,
      rowHeightFn,
      offset,
      style,
    } = props;

    const {
      fixedColDataKey,
      fluidColDataKey,
      fixedColWidth,
      fluidColWidth,
      visibleWidth,
    } = metaData;

    const heightGetter = d =>
      typeof rowHeightFn === 'function' ? rowHeightFn(d) : rowHeight;

    const totalHeight = data.reduce((acc, d) => {
      const height = heightGetter(d);
      return acc + height;
    }, 0);

    return (
      <div
        className="bt-rows"
        style={{
          width,
          totalHeight,
          ...style,
        }}
      >
        <FixedCol
          width={fixedColWidth}
          height={totalHeight}
          addShadow={offset > 0}
        >
          {data.map((d, i) => {
            const height = heightGetter(d);
            return (
              <ColWrap
                key={i}
                widthPadding={widthPadding}
                height={height}
                data={d}
                dataKey={fixedColDataKey}
              />
            );
          })}
        </FixedCol>
        <div
          style={{
            transform: `translate3d(${-1 *
              offset *
              (fluidColWidth - visibleWidth) +
              fixedColWidth}px, 0px, 0px)`,
            width: fluidColWidth,
            height: totalHeight,
            zIndex: 1,
          }}
        >
          {data.map((d, i) => {
            const height = heightGetter(d);
            return (
              <ColWrap
                key={i}
                widthPadding={widthPadding}
                height={height}
                data={d}
                dataKey={fluidColDataKey}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
