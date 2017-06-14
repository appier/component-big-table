# Big Table

## Table of Content

- [Big Table](#big-table)
    - [Table of Content](#table-of-content)
    - [Data Structure](#data-structure)
        - [Column Definition](#column-definition)
    - [Components](#components)
        - [Content](#content)
            - [`<Table>`](#table)
            - [`<WindowTable>`](#windowTable)
        - [Scrolling Control](#scrolling-control)
            - [`<VerticalScroll>`](#verticalscroll)
            - [`<HorizontalScroll>`](#horizontalscroll)
        - [Low-level Components](#low-level-components)
            - [`<TableHeader>`](#tableheader)
            - [`<Row>`](#row)
            - [`<Rows>`](#rows)
            - [`<FixedCol>`](#fixedcol)
            - [`<Cell>`](#cell)
        - [Miscellaneous](#miscellaneous)
            - [`<AutoSizer>`](#autosizer)
            - [`<KeySorter>`](#KeySorter)
    - [Development](#development)
    - [Publish](#publish)
    - [Todo](#todo)

## Data Structure

### Column Definition

Each element within `fixedColDataKey` and `fluidColDataKey` should be formed in following format:

```js
Immutable.Map({
  key: String, // required
  label: String, // required
  width: Number, // required
  className: String, // To append Cell class name
  sortable: Boolean,
  adjustable: Boolean,
  render: Function<rowData: Immutable.Map>,
  renderHeader: Function<keyLabelMap: Immutable.Map>,
})
```

## Components

### Content

#### `<Table>`

Store sort key, and pass sorted data to children

```js
<Table
  metaData: Immutable.Record,
  data: Immutable.List<Immutable.Map>
  // viewable width
  viewWidth: Number
  scrollLeft: Number

  widthPadding: Number // default 0
  rowHeightHeader: Number // default: 28
  rowHeightBody: Number // default: 20
  updateDataKey: Function<updater: Function<dataKey: Immutable.List<String>>>
  updateContentView: Function<param: Object({ height: Number })>

  sortKey: String // the current sorted column key
  sortOrder: Number // 1 or -1, 1 is ASC, -1 is Desc
  updateSort: Function<updater: Function<sortKey, sortOrder>>

  rowHeightFn: Function<rowData: Immutable.List<String>>
  rowModifier: Function<rowData: Immutable.List<String>>: Function<Row: ReactElement>
>
```

**Example**

```html

<Table
  data={data}
  viewWidth={800}
  viewHeight={300}
  scrollLeft={0}
  metaData={metaData}
  updateDataKey={handleUpdateDataKey}
  updateContentView={handleContentView}
  rowHeightFn={handleRowHeight}
>
```


#### `<WindowTable>`

WindowTable is like Table, but it will be constraint by props viewHeight,
and vertscroll poition will controlled by scrollTop

```js
<WindowTable
  ...
  viewHeight: Number
  scrollTop: Number // between 0 and 1
  updateContentView: Function<updater: Function<height>>
>
```

**Example**

```html

<WindowTable
  metaData={metaData}
  data={data}
  viewWidth={800}
  viewHeight={300}
  scrollTop={0}
  scrollLeft={0}
  updateDataKey={handleUpdateDataKey}
  updateContentView={handleContentView}
  sortFn={handleSorting}
  rowHeightFn={handleRowHeight}
>
```

### Scrolling Control

#### `<VerticalScroll>`

A vertical scroll that listen parentNode's wheel event.

```js
<VerticalScroll
  enableWheel: Boolean
  viewHeight: Number // viewable height
  contentHeight: Number // total height
  position: Number
  onScroll: Function<position: Number>
/>
```

**Example**

```html
<VerticalScroll
  enableWheel={true}
  viewHeight={100}
  contentHeight={1000}
  position={0}
  onScroll={position => console.log(position)}
/>
```

#### `<HorizontalScroll>`

A horizontal scroll that listen parentNode's wheel event.

```js
<HorizontalScroll
  enableWheel: Boolean
  viewWidth: Number // visable width (a.k.a remain viewable width) = viewable width - fixed columns width
  contentWidth: Number //total width (don't count fixed column width)
  position: Number
  onScroll: Function<position: Number>
/>
```

**Example**

```html
<HorizontalScroll
  enableWheel={true}
  viewWidth={100}
  contentWidth={1000}
  position={0}
  onScroll={position => console.log(position)}
/>
```

### Low-level Components

#### `<TableHeader>`

A component which store how to sort data, adjust width and custom render info.

```js
<TableHeader
  metaData: Immutable.Record

  scrollLeft: Number

  viewWidth: Number // viewable width
  widthPadding: Number

  rowHeight: Number
  sortKey: String
  sortOrder: Number

  updateSort: Function<param: Object({ sortKey: String, sortOrder: Number })>
  updateDataKey: Function<dataKey: Immutable.List<String>>
/>
```

**Example**

```html
<TableHeader
  viewWidth={viewWidth}
  metaData={metaData}
  scrollLeft={scrollLeft}
  sortKey={sortKey}
  sortOrder={sortOrder}
  updateSort={this.updateSort}
  updateDataKey={this.updateDataKey}
/>
```

#### `<Row>`

A component which adjust width for each, calculate width for `FixedCol`, adjust the left offset of `Col` and redner all cells and pass those data to `Col` and `FixedCol`.

```js
<Row
  metaData: Immutable.Record
  data: Immutable.Map
  offset: Number
  width: Number
  widthPadding: Number
  height: Number
  style: Object
  modifier: Function<data: Immutable.List<String>>: Function<Row: ReactElement>
/>
```

**Example**

```html
<Row
  width={containerWidth}
  metaData={metaData}
  data={data}
/>
```


#### `<Rows>`

The main difference between Rows and Row is that Rows will wrap all row into a col, which make is horiziontal scroll more efficiently.

In addition, Rows don't have `modifier`, but it has `rowHeightFn` to control individual row height.

```js
<Rows
  data: Immutable.List<Immutable.Map>
  metaData: Immutable.Record,
  offset: Number
  width: Number
  widthPadding: Number
  height: Number
  style: Object
  rowHeightFn: Function<data: Immutable.Map>: Number
/>
```

**Example**

```html
<Rows
  width={containerWidth}
  metaData={metaData}
  data={data}
/>
```

#### `<FixedCol>`

A component which group all cell which is fixed.

```html
<FixedCol
  left: Number
  width: Number
  height: Number
  addShadow: Boolean
>
  {ReactElement}
</FixedCol>
```

#### `<Cell>`

A component which make all content styled.

Default style:

```css
display: inline-block;
vertical-align: top;
white-space: normal;
position: absolute;
overflow: hidden;
```

```html
<Cell
  widthPadding: Number
  left: Number
  width: Number
  height: Number
  className: String
>
  {ReactElement}
</Cell>
```

### Miscellaneous

#### `<AutoSizer>`

A component which get available width / height.

We copy the implement from https://github.com/bvaughn/react-virtualized/blob/master/source/AutoSizer/AutoSizer.js

```js
<AutoSizer
  onResize: Function<size: Object({ height: Number, width: Number })>
>
  ....
</AutoSizer>
```

**Example**

```html
<AutoSizer onResize={this.handleResize}>
  <Table
    viewWidth={viewWidth}
    viewHeight={viewHeight}
    ...
  />
</AutoSizer>
```

#### `<KeySorter>`

```js
<KeySorter
  dataKey: Immutable.List<String>
  onChange: Function<dataKey: String>
/>
```

## Development

Setup:

```
$ yarn
```

Run:

```
$ npm run start
```

And open storybook with browser: http://localhost:9001/

## Publish

```
$ npm publish
```

## LICENSE


MIT

