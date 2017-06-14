import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { List, Map, fromJS } from 'immutable';

import TableHeader from '../src/TableBody/TableHeader';

import { calculateMetaData } from '../src/TableBody/util';

const DEFAULT_DATA_KEY = fromJS([
  {
    key: 'name',
    label: 'Name',
    width: 200,
    sortable: true,
    adjustable: true,
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
    label: 'Impression',
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
  {
    key: 'ctcv',
    label: 'CTCV',
    width: 60,
    sortable: true,
    adjustable: true,
  },
  {
    key: 'lccv',
    label: 'LCCV',
    width: 120,
    sortable: true,
    adjustable: true,
  },
]);

const viewWidth = 400;
const fixedKey = List(['name']);

storiesOf('TableHeader').addWithInfo(
  'TableHeader',
  '',
  () => {
    const Host = React.createClass({
      getInitialState() {
        return {
          dataKey: DEFAULT_DATA_KEY,
          sortKey: null,
          sortOrder: null,
        };
      },

      updateSort(d) {
        this.setState(d);
      },

      updateDataKey(updater) {
        this.setState({ dataKey: updater(this.state.dataKey) });
      },

      render() {
        const { dataKey, sortKey, sortOrder } = this.state;

        const metaData = calculateMetaData(viewWidth)(fixedKey)(dataKey);

        return (
          <TableHeader
            metaData={metaData}
            viewWidth={viewWidth}
            scrollLeft={0}
            sortKey={sortKey}
            sortOrder={sortOrder}
            updateSort={this.updateSort}
            updateDataKey={this.updateDataKey}
          />
        );
      },
    });

    return <Host />;
  },
  { inline: true, source: false }
);

storiesOf('TableHeader').addWithInfo(
  'TableHeader + widthPadding',
  '',
  () => {
    const Host = React.createClass({
      getInitialState() {
        return {
          dataKey: DEFAULT_DATA_KEY,
          sortKey: null,
          sortOrder: null,
        };
      },

      updateSort(d) {
        this.setState(d);
      },

      updateDataKey(updater) {
        this.setState({ dataKey: updater(this.state.dataKey) });
      },

      render() {
        const { dataKey, sortKey, sortOrder } = this.state;

        const metaData = calculateMetaData(viewWidth)(fixedKey)(dataKey);

        return (
          <TableHeader
            metaData={metaData}
            viewWidth={viewWidth}
            scrollLeft={0}
            widthPadding={10}
            sortKey={sortKey}
            sortOrder={sortOrder}
            updateSort={this.updateSort}
            updateDataKey={this.updateDataKey}
          />
        );
      },
    });

    return <Host />;
  },
  { inline: true, source: false }
);
