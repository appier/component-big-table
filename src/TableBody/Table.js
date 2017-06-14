import React from 'react';
import { List, Map, fromJS } from 'immutable';

import TableHeader from './TableHeader';
import ScrollArea from './ScrollArea';
import Row from './Row';

import { MetaData } from './util';

import './table.css';

class Table extends React.PureComponent {
  static defaultProps = {
    metaData: new MetaData(),
    data: List(),

    viewWidth: 0,
    scrollLeft: 0,

    widthPadding: 0,
    rowHeightHeader: 28,
    rowHeightBody: 20,

    sortKey: null,
    sortOrder: null,

    updateDataKey: () => {},
    updateContentView: () => {},
    updateSort: () => {},
    rowModifier: null,
    rowHeightFn: null,
  };

  render() {
    const { state, props } = this;

    const {
      metaData,
      data,

      scrollLeft,

      viewWidth,
      updateDataKey,
      updateContentView,

      widthPadding,
      rowHeightHeader,
      rowHeightBody,

      sortKey,
      sortOrder,
      updateSort,

      rowHeightFn,
      rowModifier,

      children,
    } = props;

    const realScrollLeft = metaData.fluidColWidth > metaData.visibleWidth
      ? scrollLeft
      : 0;

    return (
      <div className="bt-table">
        <TableHeader
          metaData={metaData}
          viewWidth={viewWidth}
          scrollLeft={realScrollLeft}
          widthPadding={widthPadding}
          rowHeight={rowHeightHeader}
          sortKey={sortKey}
          sortOrder={sortOrder}
          updateSort={updateSort}
          updateDataKey={updateDataKey}
        />
        <div className="bt-table-body">
          {data.map((d, i) => {
            const height = typeof rowHeightFn === 'function'
              ? rowHeightFn(d)
              : rowHeightBody;
            return (
              <Row
                key={i}
                metaData={metaData}
                data={d}
                offset={realScrollLeft}
                width={viewWidth}
                widthPadding={widthPadding}
                height={height}
                modifier={rowModifier}
              />
            );
          })}
          {children}
        </div>
      </div>
    );
  }
}

export default Table;
