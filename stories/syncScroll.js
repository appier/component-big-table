import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { List, Range } from 'immutable';

import AutoSizer from '../src/AutoSizer/AutoSizer';
import HorizontalScroll from '../src/SyncScroll/HorizontalScroll';
import VerticalScroll from '../src/SyncScroll/VerticalScroll';
import AutoVerticalScroll from '../src/SyncScroll/AutoVerticalScroll';

import { wheelScrollEventHandler } from '../src/SyncScroll/util';

const stories = storiesOf('SyncScroll', module);

stories.addWithInfo(
  'VerticalScroll: default',
  '',
  () => {
    const Host = React.createClass({
      getInitialState() {
        return {
          value: 0,
        };
      },

      onScroll(value) {
        this.setState({ value });
      },

      render() {
        const cloneChlidren = React.cloneElement(this.props.children, {
          position: this.state.value,
          onScroll: value => {
            this.setState({ value });
            action('onScroll')(value);
          },
        });

        return (
          <div
            className="container"
            style={{
              width: '400px',
              height: '120px',
            }}
          >
            {cloneChlidren}
          </div>
        );
      },
    });

    return (
      <Host>
        <VerticalScroll
          viewHeight={100}
          contentHeight={1000}
          position={0}
          onScroll={action('onScroll')}
        />
      </Host>
    );
  },
  { inline: true, source: true }
);

stories.addWithInfo(
  'VerticalScroll: Control Item',
  '',
  () => {
    const Host = React.createClass({
      getInitialState() {
        return {
          value: 0,
        };
      },

      onScroll(value) {
        this.setState({ value });
      },

      render() {
        const viewSize = 400;
        const contentSize = 1200;
        return (
          <div
            className="container"
            style={{
              width: viewSize,
              height: '200px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                margin: '10px 0',
                width: contentSize,
                height: '80px',
                background:
                  'linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)',
                transform: `translate3d(-${this.state.value *
                  (contentSize / 2 - viewSize) +
                  contentSize / 2}px, 0px, 0px)`,
              }}
            />
            <div
              style={{
                margin: '10px 0',
                width: contentSize,
                height: '80px',
                background:
                  'linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)',
                transform: `translate3d(${this.state.value *
                  2 *
                  (contentSize / 2 - viewSize) -
                  contentSize / 2}px, 0px, 0px)`,
              }}
            />
            <VerticalScroll
              viewHeight={viewSize}
              contentHeight={contentSize}
              position={this.state.value}
              onScroll={this.onScroll}
            />
          </div>
        );
      },
    });

    return <Host />;
  },
  { inline: true, source: false }
);

stories.addWithInfo(
  'VerticalScroll: use with autoSizer',
  '',
  () => {
    const Host = React.createClass({
      getInitialState() {
        return {
          value: 0,
          viewHeight: 0,
          contentHeight: 0,
        };
      },

      onScroll(value) {
        this.setState({ value });
      },

      updateViewSize({ height: viewHeight }) {
        this.setState({ viewHeight });
      },

      updateContentSize({ height: contentHeight }) {
        this.setState({ contentHeight });
      },

      render() {
        const { value, viewHeight, contentHeight } = this.state;

        return (
          <div
            className="container"
            style={{
              width: '50%',
              height: '40vh',
              overflow: 'hidden',
              padding: 0,
            }}
          >
            <AutoSizer onResize={this.updateViewSize}>
              <AutoSizer onResize={this.updateContentSize}>
                <div
                  style={{
                    padding: 20,
                    transform: `translate3d(0px, -${value *
                      (contentHeight - viewHeight)}px, 0px)`,
                  }}
                >
                  {Range(0, 40).map(d => {
                    return (
                      <div
                        key={d}
                        style={{
                          padding: '20px',
                          border: '1px solid #ddd',
                        }}
                      >
                        <span>viewHeight: {viewHeight} - </span>
                        <span>contentHeight: {contentHeight} - </span>
                        <span>index: {d}</span>
                      </div>
                    );
                  })}
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
      },
    });

    return <Host />;
  },
  { inline: true, source: false }
);

stories.addWithInfo(
  'AutoVerticalScroll',
  '',
  () => {
    const Host = React.createClass({
      render() {
        return (
          <div
            className="container"
            style={{
              width: '50%',
              height: '40vh',
              overflow: 'hidden',
              padding: 0,
            }}
          >
            <AutoVerticalScroll>
              {Range(0, 20).map(d => {
                return (
                  <div
                    key={d}
                    style={{
                      padding: '20px',
                      border: '1px solid #ddd',
                    }}
                  >
                    <span>index: {d}</span>
                  </div>
                );
              })}
            </AutoVerticalScroll>
          </div>
        );
      },
    });

    return <Host />;
  },
  { inline: true, source: false }
);

stories.addWithInfo(
  'HorizontalScroll: default',
  '',
  () => {
    const Host = React.createClass({
      getInitialState() {
        return {
          value: 0,
        };
      },

      onScroll(value) {
        this.setState({ value });
      },

      render() {
        const cloneChlidren = React.cloneElement(this.props.children, {
          position: this.state.value,
          onScroll: value => {
            this.setState({ value });
            action('onScroll')(value);
          },
        });

        return (
          <div
            className="container"
            style={{
              width: '400px',
              height: '120px',
            }}
          >
            {cloneChlidren}
          </div>
        );
      },
    });

    return (
      <Host>
        <HorizontalScroll
          viewWidth={100}
          contentWidth={1000}
          value={0}
          onScroll={action('onScroll')}
        />
      </Host>
    );
  },
  { inline: true, source: true }
);

stories.addWithInfo(
  'HorizontalScroll: Control Item',
  '',
  () => {
    const Host = React.createClass({
      getInitialState() {
        return {
          value: 0,
        };
      },

      onScroll(value) {
        this.setState({ value });
      },

      render() {
        const viewSize = 400;
        const contentSize = 1200;
        return (
          <div
            className="container"
            style={{
              width: '200px',
              height: viewSize,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                margin: '0 50px',
                width: '100px',
                height: contentSize,
                background:
                  'linear-gradient(to bottom, red,orange,yellow,green,blue,indigo,violet)',
                transform: `translate3d(0px, -${this.state.value *
                  viewSize}px, 0px)`,
              }}
            />
            <HorizontalScroll
              viewWidth={viewSize}
              contentWidth={contentSize}
              position={this.state.value}
              onScroll={this.onScroll}
            />
          </div>
        );
      },
    });

    return <Host />;
  },
  { inline: true, source: false }
);

stories.addWithInfo(
  'HorizontalScroll: use with autoSizer',
  '',
  () => {
    const Host = React.createClass({
      getInitialState() {
        return {
          viewHeight: 0,
          contentHeight: 0,
          value: 0,
        };
      },

      onScroll(value) {
        this.setState({ value });
      },

      updateViewSize({ height: viewHeight }) {
        this.setState({ viewHeight });
      },

      updateContentSize({ height: contentHeight }) {
        this.setState({ contentHeight });
      },

      render() {
        const { value, viewHeight, contentHeight } = this.state;
        return (
          <div
            className="container"
            style={{
              width: '600px',
              height: '300px',
              overflow: 'hidden',
              padding: 0,
            }}
          >
            <AutoSizer onResize={this.updateViewSize}>
              <AutoSizer onResize={this.updateContentSize}>
                <div
                  style={{
                    padding: 20,
                    transform: `translate3d(0px, -${value *
                      (contentHeight - viewHeight)}px, 0px)`,
                  }}
                >
                  {Range(0, 40).map(d => {
                    return (
                      <div
                        key={d}
                        style={{
                          padding: '20px',
                          border: '1px solid #ddd',
                        }}
                      >
                        <span>viewHeight: {viewHeight} - </span>
                        <span>contentHeight: {contentHeight} - </span>
                        <span>index: {d}</span>
                      </div>
                    );
                  })}
                </div>
              </AutoSizer>
            </AutoSizer>
            <HorizontalScroll
              viewWidth={viewHeight}
              contentWidth={contentHeight}
              position={value}
              onScroll={this.onScroll}
            />
          </div>
        );
      },
    });

    return <Host />;
  },
  { inline: true, source: false }
);

stories.addWithInfo(
  'Bind custom scroll event through method',
  '',
  () => {
    const contentSize = 900;
    const viewSize = 300;

    const Host = React.createClass({
      getInitialState() {
        return {
          position: 0,
        };
      },

      componentDidMount() {
        this.root.addEventListener('wheel', this.onWheelScroll);
      },

      componentWillUnmount() {
        if (this.root) {
          this.root.removeEventListener('wheel', this.onWheelScroll);
        }
      },

      onWheelScroll(e) {
        this.scrollBar.onWheelScroll(e);
      },

      onScroll(position) {
        this.setState({ position });
      },

      render() {
        const { position } = this.state;
        return (
          <div
            className="container"
            style={{
              display: 'flex',
            }}
          >
            <div
              ref={el => (this.root = el)}
              style={{
                width: viewSize,
                height: viewSize,
                background: '#fff',
                border: '1px solid #ddd',
                textAlign: 'center',
                lineHeight: viewSize + 'px',
              }}
            >
              Scroll in this area
            </div>
            <div
              style={{
                position: 'relative',
                marginLeft: 30,
                width: viewSize,
                height: viewSize,
                background: '#fff',
                border: '1px solid #ddd',
              }}
            >
              <HorizontalScroll
                ref={el => (this.scrollBar = el)}
                viewWidth={viewSize}
                contentWidth={contentSize}
                position={position}
                onScroll={this.onScroll}
              />
            </div>
          </div>
        );
      },
    });

    return <Host />;
  },
  { inline: true, source: false }
);

stories.addWithInfo(
  'Scroll util: bind custom scroll event',
  '',
  () => {
    const contentSize = 900;
    const viewSize = 300;

    const Host = React.createClass({
      getInitialState() {
        return {
          position: 0,
        };
      },

      componentDidMount() {
        this.root.addEventListener('wheel', this.onWheelScroll);
      },

      componentWillUnmount() {
        if (this.root) {
          this.root.removeEventListener('wheel', this.onWheelScroll);
        }
      },

      onWheelScroll(e) {
        const { position } = this.state;
        const barSize = viewSize;
        const indicatorSize = viewSize * viewSize / contentSize;
        wheelScrollEventHandler(e.deltaX + e.deltaY)({
          barSize,
          indicatorSize,
          position,
        })(position => {
          this.setState({
            position,
          });
          e.stopPropagation();
          e.preventDefault();
        });
      },

      render() {
        const { position } = this.state;
        return (
          <div
            className="container"
            style={{
              display: 'flex',
            }}
          >
            <div
              ref={el => (this.root = el)}
              style={{
                width: viewSize,
                height: viewSize,
                background: '#fff',
                border: '1px solid #ddd',
                textAlign: 'center',
                lineHeight: viewSize + 'px',
              }}
            >
              Scroll in this area
            </div>
            <div
              style={{
                position: 'relative',
                marginLeft: 30,
                width: viewSize,
                height: viewSize,
                background: '#fff',
                border: '1px solid #ddd',
              }}
            >
              <HorizontalScroll
                viewWidth={viewSize}
                contentWidth={contentSize}
                position={position}
              />
            </div>

            <div
              style={{
                position: 'relative',
                marginLeft: 30,
                width: viewSize,
                height: viewSize,
                background: '#fff',
                border: '1px solid #ddd',
              }}
            >
              <VerticalScroll
                viewHeight={viewSize}
                contentHeight={contentSize}
                position={position}
              />
            </div>

          </div>
        );
      },
    });

    return <Host />;
  },
  { inline: true, source: false }
);
