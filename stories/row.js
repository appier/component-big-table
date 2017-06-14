import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { List, Map, fromJS } from 'immutable';

import HorizontalScroll from '../src/SyncScroll/HorizontalScroll';
import { calculateMetaData } from '../src/TableBody/util';
import Row from '../src/TableBody/Row';

const dataKey = fromJS([
  {
    key: 'name',
    label: 'Name',
    width: 200,
    render: rowData => rowData.get('name').toUpperCase(),
  },
  {
    key: 'cost',
    label: 'Cost',
    width: 100,
  },
  {
    key: 'impression',
    label: 'Imp.',
    width: 120,
  },
  {
    key: 'click',
    label: 'Click',
    width: 80,
  },
  {
    key: 'action',
    label: 'Action',
    width: 60,
  },
]);

storiesOf('Row').addWithInfo(
  'Row: default',
  '',
  () => {
    const data = fromJS({
      name: 'big_table',
      cost: 'cost',
      impression: 'impression',
      click: 'click',
      action: 'action',
    });

    const containerWidth = 480;

    const metaData = calculateMetaData(containerWidth)(List())(dataKey);

    return (
      <div className="big-table-example-row" style={{ width: containerWidth }}>
        <Row width={containerWidth} metaData={metaData} data={data} />
      </div>
    );
  },
  { inline: true, source: false }
);

storiesOf('Row').addWithInfo(
  'Row: width table',
  '',
  () => {
    const data = fromJS({
      name: 'big_table',
      cost: 'cost',
      impression: 'impression',
      click: 'click',
      action: 'action',
    });

    const containerWidth = 1200;

    const metaData = calculateMetaData(containerWidth)(List())(dataKey);

    return (
      <div className="big-table-example-row" style={{ width: containerWidth }}>
        <Row width={containerWidth} metaData={metaData} data={data} />
      </div>
    );
  },
  { inline: true, source: false }
);

storiesOf('Row').addWithInfo(
  'Row: modifier',
  '',
  () => {
    const data = fromJS({
      name: 'big_table',
      cost: 'cost',
      impression: 'impression',
      click: 'click',
      action: 'action',
      className: 'foo',
    });

    const containerWidth = 480;

    const metaData = calculateMetaData(containerWidth)(List())(dataKey);

    const modifier = data => dom => {
      return React.cloneElement(dom, {
        className: data.get('className'),
        style: {
          ...dom.props.style,
          color: '#00e',
        },
      });
    };

    return (
      <div className="big-table-example-row" style={{ width: containerWidth }}>
        <Row width={containerWidth} metaData={metaData} data={data} />
        <Row
          width={containerWidth}
          metaData={metaData}
          data={data}
          modifier={modifier}
        />
      </div>
    );
  },
  { inline: true, source: false }
);

storiesOf('Row').addWithInfo(
  'Row: with fixedKey',
  '',
  () => {
    const data = fromJS({
      name: 'big_table',
      cost: 'cost',
      impression: 'impression',
      click: 'click',
      action: 'action',
    });

    const containerWidth = 720;
    const metaData = calculateMetaData(containerWidth)(List(['name', 'cost']))(
      dataKey
    );

    return (
      <div className="big-table-example-row" style={{ width: containerWidth }}>
        <Row width={containerWidth} metaData={metaData} data={data} />
      </div>
    );
  },
  { inline: true, source: false }
);

storiesOf('Row').addWithInfo(
  'Row: work with HorizontalScroll',
  '',
  () => {
    const containerWidth1 = 400;
    const containerWidth2 = 400;

    const data = fromJS({
      name: 'big_table',
      cost: 'cost',
      impression: 'impression',
      click: 'click',
      action: 'action',
    });

    const Host = React.createClass({
      getInitialState() {
        return {
          value1: 0,
          value2: 0,
        };
      },

      onScroll1(value1) {
        this.setState({ value1 });
      },

      onScroll2(value2) {
        this.setState({ value2 });
      },

      metaData1: calculateMetaData(containerWidth1)(List(['name']))(dataKey),
      metaData2: calculateMetaData(containerWidth2)(List(['name', 'cost']))(
        dataKey
      ),

      render() {
        const { value1, value2 } = this.state;

        return (
          <div>
            <div
              className="container big-table-example-row"
              style={{
                width: containerWidth1,
                height: 40,
                overflow: 'hidden',
                padding: 0,
              }}
            >
              <Row
                width={containerWidth1}
                metaData={this.metaData1}
                data={data}
                offset={value1}
              />
              <HorizontalScroll
                viewWidth={this.metaData1.visibleWidth}
                contentWidth={this.metaData1.fluidColWidth}
                position={value1}
                onScroll={this.onScroll1}
              />
            </div>
            <div
              className="container big-table-example-row"
              style={{
                width: containerWidth2,
                height: 40,
                overflow: 'hidden',
                marginTop: 20,
                padding: 0,
              }}
            >
              <Row
                metaData={this.metaData2}
                data={data}
                width={containerWidth2}
                offset={value2}
              />
              <HorizontalScroll
                viewWidth={this.metaData2.visibleWidth}
                contentWidth={this.metaData2.fluidColWidth}
                position={value2}
                onScroll={this.onScroll2}
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
