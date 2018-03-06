import React from 'react';
import { Map, List, Record } from 'immutable';
import WidthAdjuster from './WidthAdjuster';

export const MetaData = Record({
  fixedColDataKey: List(),
  fluidColDataKey: List(),
  fixedColWidth: 0,
  fluidColWidth: 0,
  visibleWidth: 0,
});

export const filterByFixedKey = filterType => fixedKey => dataKey => {
  return dataKey.filter(d => filterType(fixedKey.contains(d.get('key'))));
};

export const calculateColOffset = dataKey => {
  let offset = 0;
  return dataKey.map(d => {
    let ret = d.set('offset', offset);
    offset += d.get('width');
    return ret;
  });
};

export const getColWidth = dataKey => {
  return dataKey.reduce((acc, d) => {
    return (d.get('width') || 50) + acc;
  }, 0);
};

export const adjustCellWidth = rawWidth => newWidth => dataKey => {
  return dataKey.map(d => {
    return d
      .update('offset', v => v * (newWidth / rawWidth))
      .update('width', v => v * (newWidth / rawWidth));
  });
};

let shortCache = {};

export const calculateMetaData = containerWidth => fixedKey => dataKey => {
  if (
    shortCache.metaData &&
    containerWidth === shortCache.containerWidth &&
    fixedKey === shortCache.fixedKey &&
    dataKey === shortCache.dataKey
  ) {
    return shortCache.metaData;
  } else {
    let fixedColDataKey = calculateColOffset(
      filterByFixedKey(d => d)(fixedKey)(dataKey)
    );
    let fluidColDataKey = calculateColOffset(
      filterByFixedKey(d => !d)(fixedKey)(dataKey)
    );

    const fixedColWidth = getColWidth(fixedColDataKey);
    let rawColWidth = getColWidth(fluidColDataKey);
    let fluidColWidth = rawColWidth;
    let visibleWidth = containerWidth - fixedColWidth;

    let metaData = new MetaData({
      fixedColDataKey,
      fluidColDataKey,
      fixedColWidth,
      fluidColWidth,
      visibleWidth,
    });

    shortCache = {
      metaData,
      containerWidth,
      fixedKey,
      dataKey,
    };

    return metaData;
  }
};

export const indicatorGenerator = sortOrder => {
  if (sortOrder === 1) {
    return (
      <span className="sort-indicator" data-sort="desc">
        <svg className="icon" viewBox="0 0 585 1024">
          <path d="M585.143 402.286q0 14.857-10.857 25.714l-256 256q-10.857 10.857-25.714 10.857t-25.714-10.857l-256-256q-10.857-10.857-10.857-25.714t10.857-25.714 25.714-10.857h512q14.857 0 25.714 10.857t10.857 25.714z" />
        </svg>
      </span>
    );
  } else {
    return (
      <span className="sort-indicator" data-sort="asc">
        <svg className="icon" viewBox="0 0 585 1024">
          <path d="M585.143 694.857q0 14.857-10.857 25.714t-25.714 10.857h-512q-14.857 0-25.714-10.857t-10.857-25.714 10.857-25.714l256-256q10.857-10.857 25.714-10.857t25.714 10.857l256 256q10.857 10.857 10.857 25.714z" />
        </svg>
      </span>
    );
  }
};

const defaultRenderFn = widthPadding => dataKey => hasSortInd => data => {
  // 4 for adjustrWidth
  let maxWidth = dataKey.get('width') - widthPadding * 2 - 4;
  if (hasSortInd) {
    maxWidth = maxWidth - 20;
  }
  const style = { maxWidth };

  const textToDisplay = dataKey.get('renderHeader')
    ? dataKey.get('renderHeader')(data)
    : data.get(dataKey.get('key'));

  return <div style={style} className="bt-header-text">{textToDisplay}</div>;
};

const sortRenderFn = dataKey => ({
  height,
  key,
  sortKey,
  sortOrder,
  updateSortWay,
}) => originalRenderFn => data => {
  let $sortIndicator = null;
  if (sortKey === key) {
    $sortIndicator = indicatorGenerator(sortOrder);
  }
  let clickHandler = updateSortWay(null);
  clickHandler = updateSortWay(key);
  return (
    <div style={{ height }} className="bt-sort-fn-wrap" onClick={clickHandler}>
      {originalRenderFn(data)}
      {$sortIndicator}
    </div>
  );
};

const adjustRenderFn = dataKey => ({
  height,
  updateDataWidth,
}) => originalRenderFn => data => {
  return (
    <div style={{ height }} className="bt-adjust-fn-wrap">
      {originalRenderFn(data)}
      <WidthAdjuster
        originalWidth={dataKey.get('width')}
        update={updateDataWidth}
      />
    </div>
  );
};

const finalWrapFn = ({ height, key, sortKey }) => originalRenderFn => data => {
  let cx = ['bt-header-cell'];
  if (sortKey === key) {
    cx.push('sorted');
  }
  return (
    <div style={{ height }} className={cx.join(' ')}>
      {originalRenderFn(data)}
    </div>
  );
};

export const injectHeadFunction = ({
  widthPadding,
  rowHeight,
  updateDataWidth,
  updateSortWay,
  sortKey,
  sortOrder,
}) => dataKey => {
  return dataKey.map((d, i) => {
    const key = d.get('key');
    const sortable = d.get('sortable') || false;
    const adjustable = d.get('adjustable') || false;
    const height = rowHeight;
    let renderFn = defaultRenderFn(widthPadding)(d)(
      sortable && sortKey === key
    );

    if (sortable) {
      renderFn = sortRenderFn(d)({
        height,
        key,
        sortKey,
        sortOrder,
        updateSortWay,
      })(renderFn);
    }
    if (adjustable) {
      renderFn = adjustRenderFn(d)({
        height,
        updateDataWidth: updateDataWidth(key),
      })(renderFn);
    }

    renderFn = finalWrapFn({ height, key, sortKey })(renderFn);

    return d.set('render', renderFn);
  });
};

export const headerFormatter = dataKey => {
  return dataKey.reduce((acc, d) => {
    return acc.set(d.get('key'), d.get('label'));
  }, Map());
};

export const defaultSortFn = (sortKey, sortOrder) => (a, b) => {
  let aValue = a.get(sortKey);
  let bValue = b.get(sortKey);

  if (aValue == null) return 1;
  if (bValue == null) return -1;

  if (typeof aValue === typeof bValue) {
    if (typeof aValue === 'string') {
      if (aValue < bValue) {
        return -1 * sortOrder;
      } else if (aValue > bValue) {
        return 1 * sortOrder;
      }
      return 0;
    } else if (typeof aValue === 'number') {
      return (bValue - aValue) * sortOrder;
    }
  }
  return 0;
};
