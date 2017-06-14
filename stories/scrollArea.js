import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { List, Map, Range, fromJS } from 'immutable';

import AutoSizer from '../src/AutoSizer/AutoSizer';
import HorizontalScroll from '../src/SyncScroll/HorizontalScroll';
import VerticalScroll from '../src/SyncScroll/VerticalScroll';
import ScrollArea from '../src/TableBody/ScrollArea';

import { calculateMetaData } from '../src/TableBody/util';

const dataKey = fromJS([
  {
    key: 'name',
    label: 'Name',
    width: 200,
    sortable: true,
    adjustable: true,
    // render: d => {
    //   console.log('render');
    //   return d.get('name');
    // },
  },
  {
    key: 'cost',
    label: 'Cost',
    width: 100,
    sortable: true,
    adjustable: true,
  },
  {
    key: 'impression',
    label: 'Imp.',
    width: 120,
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

const viewHeight = 280;
const viewWidth = 400;
const fixedKey = List(['name']);
const metaData = calculateMetaData(viewWidth)(fixedKey)(dataKey);
const data = Range(0, 40)
  .map(d => {
    return Map({
      name: 'long row name ' + d,
      cost: 'cost',
      impression: 'impression',
      click: 'click',
      action: 'action',
    });
  })
  .toList();

storiesOf('ScrollArea').addWithInfo(
  'ScrollArea, TableContent',
  '',
  () => {
    const Host = React.createClass({
      getInitialState() {
        return {
          viewHeight: 0,
          contentHeight: 0,
          scrollTop: 0,
          scrollLeft: 0,
        };
      },
      updateContentView({ height }) {
        this.setState({
          contentHeight: height,
        });
      },
      onVerticalScroll(scrollTop) {
        this.setState({ scrollTop });
      },
      onHorizontalScroll(scrollLeft) {
        this.setState({ scrollLeft });
      },
      render() {
        const { scrollTop, scrollLeft, contentHeight } = this.state;

        return (
          <div
            style={{
              width: viewWidth + 20,
              height: viewHeight + 20,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              className="table-wrap"
              style={{
                position: 'relative',
                width: viewWidth,
                height: '100%',
              }}
            >
              <div
                style={{
                  border: '1px solid #ddd',
                  height: viewHeight,
                }}
              >
                <ScrollArea
                  metaData={metaData}
                  data={data}
                  viewWidth={viewWidth}
                  viewHeight={viewHeight}
                  scrollTop={scrollTop}
                  scrollLeft={scrollLeft}
                  updateContentView={this.updateContentView}
                />
              </div>
              <HorizontalScroll
                viewWidth={viewWidth - metaData.fixedColWidth}
                contentWidth={metaData.fluidColWidth}
                position={scrollLeft}
                onScroll={this.onHorizontalScroll}
              />
            </div>
            <VerticalScroll
              viewHeight={viewHeight}
              contentHeight={contentHeight}
              position={scrollTop}
              onScroll={this.onVerticalScroll}
            />
          </div>
        );
      },
    });

    return <Host />;
  },
  { inline: true, source: false }
);
