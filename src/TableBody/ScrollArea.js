import React from 'react';
import { List, Map, fromJS } from 'immutable';

import AutoSizer from '../AutoSizer/AutoSizer';
import Rows from './Rows';

import { MetaData } from './util';

import './table.css';

class ScrollArea extends React.PureComponent {
  static defaultProps = {
    metaData: new MetaData(),
    data: List(),
    viewWidth: 0,
    viewHeight: 0,

    widthPadding: 0,
    rowHeight: 20,
    scrollTop: 0,
    scrollLeft: 0,

    updateContentView: () => {},
    rowModifier: null,
    rowHeightFn: null,
  };

  state = {
    height: 0,
  };

  updateViewSize = ({ height }) => {
    this.setState({ height });
    this.props.updateContentView({
      height,
    });
  };

  render() {
    const { state, props } = this;
    const {
      metaData,
      data,
      viewWidth,
      viewHeight,
      scrollTop,
      scrollLeft,

      widthPadding,
      rowHeight,
      rowModifier,
      rowHeightFn,

      children,
    } = props;

    const { height } = state;

    return (
      <div
        className="bt-scroll-area"
        style={{
          transform: `translate3d(0px, -${scrollTop *
            (height - viewHeight)}px, 0px)`,
        }}
      >
        <AutoSizer onResize={this.updateViewSize}>
          <Rows
            metaData={metaData}
            data={data}
            offset={scrollLeft}
            width={viewWidth}
            widthPadding={widthPadding}
            rowHeight={rowHeight}
            rowHeightFn={rowHeightFn}
            modifier={rowModifier}
          />
          {children}
        </AutoSizer>
      </div>
    );
  }
}

export default ScrollArea;
