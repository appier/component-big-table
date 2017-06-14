import React from 'react';
import { List, Map, fromJS } from 'immutable';

import TableHeader from './TableHeader';
import ScrollArea from './ScrollArea';

import { MetaData } from './util';

import './table.css';

class WindowTable extends React.PureComponent {
  static defaultProps = {
    metaData: new MetaData(),
    data: List(),

    viewWidth: 0,
    viewHeight: 0,

    scrollTop: 0,
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

      scrollTop,
      scrollLeft,

      viewHeight,
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
        <div className="bt-table-body" style={{ height: viewHeight }}>
          <ScrollArea
            metaData={metaData}
            data={data}
            viewWidth={viewWidth}
            viewHeight={viewHeight}
            scrollTop={scrollTop}
            scrollLeft={realScrollLeft}
            updateContentView={updateContentView}
            widthPadding={widthPadding}
            rowHeight={rowHeightBody}
            rowHeightFn={rowHeightFn}
            rowModifier={rowModifier}
          >
            {children}
          </ScrollArea>
        </div>
      </div>
    );
  }
}

export default WindowTable;
