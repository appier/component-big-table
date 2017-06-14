import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { List, Map, Range, fromJS } from 'immutable';

import AutoSizer from '../src/AutoSizer/AutoSizer';
import HorizontalScroll from '../src/SyncScroll/HorizontalScroll';
import VerticalScroll from '../src/SyncScroll/VerticalScroll';
import Table from '../src/TableBody/Table';
import WindowTable from '../src/TableBody/WindowTable';
import Row from '../src/TableBody/Row';

import {
  DEFAULT_SORT_FUNCTION,
  calculateMetaData,
  defaultSortFn,
} from '../src/TableBody/util';

const DEFAULT_DATA_KEY = fromJS([
  {
    key: 'name',
    label: 'Name',
    width: 200,
    sortable: true,
    adjustable: true,
    renderHeader: d => <span style={{ color: 'blue' }}>{d.get('name')}</span>,
    render: d => <span style={{ color: 'blue' }}>{d.get('name')}</span>,
  },
  {
    key: 'cost',
    label: 'Cost',
    width: 140,
    sortable: true,
    adjustable: true,
  },
  {
    key: 'impression',
    label: 'Impression',
    width: 200,
    sortable: true,
    adjustable: true,
  },
  {
    key: 'click',
    label: 'Click',
    width: 120,
    sortable: true,
    adjustable: true,
  },
  {
    key: 'action',
    label: 'Action',
    width: 100,
    sortable: true,
    adjustable: true,
  },
  {
    key: 'cpc',
    label: 'CPC',
    width: 100,
    sortable: true,
    adjustable: true,
  },
  {
    key: 'cpa',
    label: 'CPA',
    width: 80,
    sortable: true,
    adjustable: true,
  },
  {
    key: 'cpm',
    label: 'CPM',
    width: 80,
    sortable: true,
    adjustable: true,
  },
  {
    key: 'ctr',
    label: 'CTR',
    width: 80,
    sortable: true,
    adjustable: true,
  },
]);

const DEFAULT_DATA = (size = 40) => {
  return Range(0, size)
    .map(d => {
      return Map({
        id: d,
        name: 'long row name ' + d,
        cost: Math.ceil(Math.random() * 20 * d + d) / 100,
        impression: Math.ceil(Math.random() * 200 * d),
        click:
          Math.ceil(Math.random() * 4 * d) * Math.ceil(Math.random() * 5 * d),
        action: Math.ceil(Math.random() * 2 * d),
        cpc: Math.ceil(Math.random() * 20) / 100,
        cpa: Math.ceil(Math.random() * 20) / 100,
        cpm: Math.ceil(Math.random() * 20) / 200,
        ctr: Math.ceil(Math.random()) / 100,
      });
    })
    .toList();
};

const stories = storiesOf('Table');

stories.addWithInfo(
  'Table + Sort Fn + Width padding',
  '',
  () => {
    const viewWidth = 960;
    const viewHeightPadding = 120;
    const fixedKey = List(['name']);

    const Host = React.createClass({
      getInitialState() {
        return {
          data: DEFAULT_DATA(),
          dataKey: DEFAULT_DATA_KEY,
          scrollLeft: 0,
          sortOrder: null,
          sortKey: null,
        };
      },

      updateDataKey(updater) {
        this.setState({ dataKey: updater(this.state.dataKey) });
      },

      updateContentView({ height }) {
        this.setState({
          contentHeight: height,
        });
      },

      updateSort({ sortKey, sortOrder }) {
        this.setState({ sortKey, sortOrder });
      },

      onHorizontalScroll(scrollLeft) {
        this.setState({ scrollLeft: Math.round(scrollLeft * 100) / 100 });
      },

      render() {
        const { data, dataKey, sortKey, sortOrder, scrollLeft } = this.state;

        const metaData = calculateMetaData(viewWidth)(fixedKey)(dataKey);

        let sortedData = data;

        if (sortKey) {
          sortedData = sortedData.sort(defaultSortFn(sortKey, sortOrder));
        }

        return (
          <div
            className="big-table-example"
            style={{
              width: viewWidth,
            }}
          >
            <div className="styled-table" style={{ padding: 0 }}>

              <div className="function-bar">
                <div className="btn">Export</div>
                <div className="btn">Cloumn</div>
              </div>
              <div
                className="table-wrap"
                style={{
                  position: 'relative',
                  width: viewWidth,
                }}
              >
                <Table
                  metaData={metaData}
                  data={sortedData}
                  widthPadding={4}
                  viewWidth={viewWidth}
                  scrollLeft={scrollLeft}
                  sortKey={sortKey}
                  sortOrder={sortOrder}
                  updateDataKey={this.updateDataKey}
                  updateSort={this.updateSort}
                />
              </div>
              <div className="ht-scroll-wrap">
                <HorizontalScroll
                  viewWidth={metaData.visibleWidth}
                  contentWidth={metaData.fluidColWidth}
                  position={scrollLeft}
                  onScroll={this.onHorizontalScroll}
                />
              </div>
            </div>
            <div className="bottom-bar">
              Footer
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
  'WindowTable',
  '',
  () => {
    const viewHeight = 200;
    const viewWidth = 960;
    const scrollHeight = 18;
    const viewHeightPadding = 120;
    const summaryHeight = 32;
    const fixedKey = List(['name']);

    const Host = React.createClass({
      getInitialState() {
        return {
          data: DEFAULT_DATA(),
          dataKey: DEFAULT_DATA_KEY,
          viewHeight: 0,
          contentHeight: 0,
          scrollTop: 0,
          scrollLeft: 0,
        };
      },
      updateDataKey(updater) {
        this.setState({ dataKey: updater(this.state.dataKey) });
      },
      updateContentView({ height }) {
        this.setState({
          contentHeight: height,
        });
      },
      onVerticalScroll(scrollTop) {
        this.setState({ scrollTop: Math.round(scrollTop * 100) / 100 });
      },
      onHorizontalScroll(scrollLeft) {
        this.setState({ scrollLeft: Math.round(scrollLeft * 100) / 100 });
      },
      render() {
        const {
          data,
          dataKey,
          scrollTop,
          scrollLeft,
          contentHeight,
        } = this.state;

        const metaData = calculateMetaData(viewWidth)(fixedKey)(dataKey);

        const summaryData = Map({
          name: 'Total',
          cost: 99.99,
          impression: 99999,
          click: 9999,
          action: 999,
        });

        return (
          <div
            className="big-table-example"
            style={{
              width: viewWidth + 40,
            }}
          >
            <div
              style={{
                width: viewWidth + 40,
                height:
                  viewHeight + viewHeightPadding + scrollHeight + summaryHeight,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div className="styled-table">
                <div
                  className="table-with-hscroll"
                  style={{
                    position: 'relative',
                    width: viewWidth,
                    height: viewHeight + scrollHeight,
                  }}
                >
                  <div className="function-bar">
                    <div className="btn">Export</div>
                    <div className="btn">Cloumn</div>
                  </div>
                  <div
                    className="table-wrap"
                    style={{
                      position: 'relative',
                      width: viewWidth,
                      height: viewHeight + summaryHeight,
                    }}
                  >
                    <WindowTable
                      metaData={metaData}
                      data={data}
                      viewWidth={viewWidth}
                      viewHeight={viewHeight}
                      scrollTop={scrollTop}
                      scrollLeft={scrollLeft}
                      updateDataKey={this.updateDataKey}
                      updateContentView={this.updateContentView}
                    >
                      <Row
                        metaData={metaData}
                        data={summaryData}
                        offset={scrollLeft}
                        width={viewWidth}
                        height={40}
                        style={{
                          fontWeight: 'bold',
                          fontSize: 18,
                          lineHeight: '40px',
                        }}
                      />
                    </WindowTable>
                  </div>
                  <div className="ht-scroll-wrap">
                    <HorizontalScroll
                      viewWidth={metaData.visibleWidth}
                      contentWidth={metaData.fluidColWidth}
                      position={scrollLeft}
                      onScroll={this.onHorizontalScroll}
                    />
                  </div>
                </div>
                <VerticalScroll
                  viewHeight={viewHeight}
                  contentHeight={contentHeight}
                  position={scrollTop}
                  onScroll={this.onVerticalScroll}
                />
              </div>
            </div>
            <div className="bottom-bar">
              Footer
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
  'WindowTable + rowHeightFn',
  'This is a demostration for `rowHeightFn` props',
  () => {
    const randomInt = (begin: number, end: number): number =>
      Math.floor(Math.random() * end) + begin;

    const generateRandomRowHeight = (item: ImmutableMap): ImmutableMap =>
      item.set('_rowHeight', randomInt(25, 100));

    const viewHeight = 200;
    const viewWidth = 960;
    const scrollHeight = 18;
    const viewHeightPadding = 120;
    const summaryHeight = 32;
    const fixedKey = List(['name']);

    const Host = React.createClass({
      getInitialState() {
        return {
          data: DEFAULT_DATA().map(generateRandomRowHeight),
          dataKey: DEFAULT_DATA_KEY,
          viewHeight: 0,
          contentHeight: 0,
          scrollTop: 0,
          scrollLeft: 0,
        };
      },
      updateDataKey(updater) {
        this.setState({ dataKey: updater(this.state.dataKey) });
      },
      updateContentView({ height }) {
        this.setState({
          contentHeight: height,
        });
      },
      calcRowHeight(rowData) {
        return rowData.get('_rowHeight') || 20;
      },
      onVerticalScroll(scrollTop) {
        this.setState({ scrollTop: Math.round(scrollTop * 100) / 100 });
      },
      onHorizontalScroll(scrollLeft) {
        this.setState({ scrollLeft: Math.round(scrollLeft * 100) / 100 });
      },
      render() {
        const {
          data,
          dataKey,
          scrollTop,
          scrollLeft,
          contentHeight,
        } = this.state;

        const metaData = calculateMetaData(viewWidth)(fixedKey)(dataKey);

        const summaryData = Map({
          name: 'Total',
          cost: 99.99,
          impression: 99999,
          click: 9999,
          action: 999,
        });

        return (
          <div
            className="big-table-example"
            style={{
              width: viewWidth + 40,
            }}
          >
            <div
              style={{
                width: viewWidth + 40,
                height:
                  viewHeight + viewHeightPadding + scrollHeight + summaryHeight,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div className="styled-table">
                <div
                  className="table-with-hscroll"
                  style={{
                    position: 'relative',
                    width: viewWidth,
                    height: viewHeight + scrollHeight,
                  }}
                >
                  <div className="function-bar">
                    <div className="btn">Export</div>
                    <div className="btn">Cloumn</div>
                  </div>
                  <div
                    className="table-wrap"
                    style={{
                      position: 'relative',
                      width: viewWidth,
                      height: viewHeight + summaryHeight,
                    }}
                  >
                    <WindowTable
                      metaData={metaData}
                      data={data}
                      viewWidth={viewWidth}
                      viewHeight={viewHeight}
                      scrollTop={scrollTop}
                      scrollLeft={scrollLeft}
                      updateDataKey={this.updateDataKey}
                      updateContentView={this.updateContentView}
                      rowHeightFn={this.calcRowHeight}
                    >
                      <Row
                        metaData={metaData}
                        data={summaryData}
                        offset={scrollLeft}
                        width={viewWidth}
                        height={40}
                        style={{
                          fontWeight: 'bold',
                          fontSize: 18,
                          lineHeight: '40px',
                        }}
                      />
                    </WindowTable>
                  </div>
                  <div className="ht-scroll-wrap">
                    <HorizontalScroll
                      viewWidth={metaData.visibleWidth}
                      contentWidth={metaData.fluidColWidth}
                      position={scrollLeft}
                      onScroll={this.onHorizontalScroll}
                    />
                  </div>
                </div>
                <VerticalScroll
                  viewHeight={viewHeight}
                  contentHeight={contentHeight}
                  position={scrollTop}
                  onScroll={this.onVerticalScroll}
                />
              </div>
            </div>
            <div className="bottom-bar">
              Footer
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
  'Really Big Table',
  '',
  () => {
    const viewHeight = 200;
    const viewWidth = 960;
    const scrollHeight = 18;
    const viewHeightPadding = 120;
    const summaryHeight = 32;
    const fixedKey = List(['name']);

    const Host = React.createClass({
      getInitialState() {
        return {
          data: DEFAULT_DATA(500),
          dataKey: DEFAULT_DATA_KEY,
          viewHeight: 0,
          contentHeight: 0,
          scrollTop: 0,
          scrollLeft: 0,
        };
      },
      updateDataKey(updater) {
        this.setState({ dataKey: updater(this.state.dataKey) });
      },
      updateContentView({ height }) {
        this.setState({
          contentHeight: height,
        });
      },
      onVerticalScroll(scrollTop) {
        this.setState({ scrollTop: Math.round(scrollTop * 100) / 100 });
      },
      onHorizontalScroll(scrollLeft) {
        this.setState({ scrollLeft: Math.round(scrollLeft * 100) / 100 });
      },
      render() {
        const {
          data,
          dataKey,
          scrollTop,
          scrollLeft,
          contentHeight,
        } = this.state;

        const metaData = calculateMetaData(viewWidth)(fixedKey)(dataKey);

        const summaryData = Map({
          name: 'Total',
          cost: 99.99,
          impression: 99999,
          click: 9999,
          action: 999,
        });

        return (
          <div
            className="big-table-example"
            style={{
              width: viewWidth + 40,
            }}
          >
            <div
              style={{
                width: viewWidth + 40,
                height:
                  viewHeight + viewHeightPadding + scrollHeight + summaryHeight,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div className="styled-table">
                <div
                  className="table-with-hscroll"
                  style={{
                    position: 'relative',
                    width: viewWidth,
                    height: viewHeight + scrollHeight,
                  }}
                >
                  <div className="function-bar">
                    <div className="btn">Export</div>
                    <div className="btn">Cloumn</div>
                  </div>
                  <div
                    className="table-wrap"
                    style={{
                      position: 'relative',
                      width: viewWidth,
                      height: viewHeight + summaryHeight,
                    }}
                  >
                    <WindowTable
                      metaData={metaData}
                      data={data}
                      viewWidth={viewWidth}
                      viewHeight={viewHeight}
                      scrollTop={scrollTop}
                      scrollLeft={scrollLeft}
                      updateDataKey={this.updateDataKey}
                      updateContentView={this.updateContentView}
                    >
                      <Row
                        metaData={metaData}
                        data={summaryData}
                        offset={scrollLeft}
                        width={viewWidth}
                        height={40}
                        style={{
                          fontWeight: 'bold',
                          fontSize: 18,
                          lineHeight: '40px',
                        }}
                      />
                    </WindowTable>
                  </div>
                  <div className="ht-scroll-wrap">
                    <HorizontalScroll
                      viewWidth={metaData.visibleWidth}
                      contentWidth={metaData.fluidColWidth}
                      position={scrollLeft}
                      onScroll={this.onHorizontalScroll}
                    />
                  </div>
                </div>
                <VerticalScroll
                  viewHeight={viewHeight}
                  contentHeight={contentHeight}
                  position={scrollTop}
                  onScroll={this.onVerticalScroll}
                />
              </div>
            </div>
            <div className="bottom-bar">
              Footer
            </div>
          </div>
        );
      },
    });

    return <Host />;
  },
  { inline: true, source: false }
);
