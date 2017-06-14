import React from 'react';

import AutoSizer from '../AutoSizer/AutoSizer';
import VerticalScroll from './VerticalScroll';

export default class AutoVerticalScroll extends React.PureComponent {
  state = {
    value: 0,
    viewHeight: 0,
    contentHeight: 0,
  };

  onScroll = value => {
    this.setState({ value });
  };

  updateViewSize = ({ height: viewHeight }) => {
    this.setState({ viewHeight });
  };

  updateContentSize = ({ height: contentHeight }) => {
    this.setState({ contentHeight });
  };

  render() {
    const { value, viewHeight, contentHeight } = this.state;
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <AutoSizer onResize={this.updateViewSize}>
          <AutoSizer onResize={this.updateContentSize}>
            <div
              style={{
                transform: `translate3d(0px, -${value *
                  (contentHeight - viewHeight)}px, 0px)`,
              }}
            >
              {this.props.children}
            </div>
          </AutoSizer>
        </AutoSizer>
        <VerticalScroll
          viewHeight={viewHeight}
          contentHeight={contentHeight}
          position={value}
          onScroll={this.onScroll}
        />
      </div>
    );
  }
}
