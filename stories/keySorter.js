import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { List, Map, fromJS } from 'immutable';

import KeySorter from '../src/KeySorter/KeySorter';

const stories = storiesOf('KeySorter', module);

const DEFAULT_DATA_KEY = fromJS([
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'cost',
    label: 'Cost',
  },
  {
    key: 'impression',
    label: 'Impression',
  },
  {
    key: 'click',
    label: 'Click',
  },
  {
    key: 'action',
    label: 'Action',
  },
  {
    key: 'cpc',
    label: 'CPC',
  },
  {
    key: 'cpa',
    label: 'CPA',
  },
  {
    key: 'cpm',
    label: 'CPM',
  },
  {
    key: 'ctr',
    label: 'CTR',
  },
]);

stories.addWithInfo(
  'KeySorter',
  '',
  () => {
    const Host = React.createClass({
      getInitialState() {
        return {
          dataKey: DEFAULT_DATA_KEY,
        };
      },

      updateDataKey(dataKey) {
        this.setState({ dataKey });
      },

      render() {
        const { dataKey } = this.state;

        return (
          <div className="container">
            <KeySorter dataKey={dataKey} onChange={this.updateDataKey} />
          </div>
        );
      },
    });

    return <Host />;
  },
  { inline: true, source: true }
);
