import React from 'react';

import { List } from 'immutable';

import Row from './Row';
import WidthAdjuster from './WidthAdjuster';

import { MetaData } from './util';

import {
  indicatorGenerator,
  injectHeadFunction,
  headerFormatter,
} from './util';

import './table.css';

class TableHeader extends React.PureComponent {
  static defaultProps = {
    metaData: new MetaData(),
    scrollLeft: 0,

    viewWidth: 0,
    widthPadding: 0,
    rowHeight: 28,
    sortKey: null,
    sortOrder: 1,
    updateSort: () => {},
    updateDataKey: () => {},
  };

  state = {
    data: List(),
    metaData: new MetaData(),
  };

  componentWillMount() {
    this.updateMetaData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.metaData !== this.props.metaData ||
      nextProps.rowHeight !== this.props.rowHeight ||
      nextProps.widthPadding !== this.props.widthPadding ||
      nextProps.sortKey !== this.props.sortKey ||
      nextProps.sortOrder !== this.props.sortOrder
    ) {
      this.updateMetaData(nextProps);
    }
  }

  updateMetaData = props => {
    const { metaData, widthPadding, rowHeight, sortKey, sortOrder } = props;

    const data = headerFormatter(
      metaData.fixedColDataKey.concat(metaData.fluidColDataKey)
    );

    const injectHeadFunctionWithParam = injectHeadFunction({
      widthPadding,
      rowHeight,
      updateDataWidth: this.updateDataWidth,
      updateSortWay: this.updateSortWay,
      sortKey,
      sortOrder,
    });

    const newMetaData = metaData
      .update('fixedColDataKey', injectHeadFunctionWithParam)
      .update('fluidColDataKey', injectHeadFunctionWithParam);

    this.setState({ data, metaData: newMetaData });
  };

  updateSortWay = key => {
    return () => {
      const { updateSort, sortKey, sortOrder } = this.props;
      if (sortKey === key) {
        updateSort({
          sortKey: key,
          sortOrder: sortOrder * -1,
        });
      } else {
        updateSort({
          sortKey: key,
          sortOrder: 1,
        });
      }
    };
  };

  updateDataWidth = key => {
    const { updateDataKey } = this.props;
    return width => {
      updateDataKey(dataKey =>
        dataKey.map(d => {
          if (d.get('key') === key) {
            return d.set('width', width);
          }
          return d;
        })
      );
    };
  };

  render() {
    const { props } = this;
    const { scrollLeft, viewWidth, widthPadding, rowHeight } = props;
    const { data, metaData } = this.state;

    return (
      <div className="bt-table-header">
        <Row
          data={data}
          offset={scrollLeft}
          width={viewWidth}
          height={rowHeight}
          widthPadding={widthPadding}
          metaData={metaData}
        />
      </div>
    );
  }
}

export default TableHeader;
