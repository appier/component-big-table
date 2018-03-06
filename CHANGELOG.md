
# 1.1.2

* adjust defaultSortFn - deal with null value, we will ignore it.

# 1.1.0

### AutoVerticalScroll

* New convient scroll view wrap!


### Bug fix

* Fix syncScroll stores broken due to AutoSizer interface change


# 1.0.0

### AutoSizer

* AutoSize children no longer accept functional children for perf issue.


### Table

* Remove sort function: now we provide three props for control sort stat.

`sortKey` : the key of which column is sorting. null means no sorting.
`sortOrder` : 1 for Desc, -1 for Asc
`updateSort`: callback function when user click sort indicator. It will return object { sortKey, sortOrder }

Due to this change, we `tableUtil` now expose `defaultSortFn`, the follwing example show how to sort data by your own.

```js
import { defaultSortFn }  from 'tableUtil';

//define callback handler
updateSort: ({sortKey, sortOrder}) => {this.setState({sortKey, sortOrder})}

// in render of component
let sortedData = data;

const { sortKey, sortOrder } = this.state;

if (sortKey) {
  sortedData = sortedData.sort(defaultSortFn(sortKey, sortOrder));
}

...

<Table
  sortKey={sortKey}
  sortOrder={sortOrder}
  data={sortedData}
  updateSort={this.updateSort}
  ...
>
```

### Record metaData

* Row, ScrollArea, Table, TableHeader now accecpt props `metaData`, and remove props `fixedColDataKey`, `fluidColDataKey`, `fixedColWidth`, `fluidColWidth`, `visibleWidth`.

### WindowTable

* Original Table component rename to WindowTable, New Table will not have vertical scroll area!


### Table, WindowTable, ScrollArea, TableHeader, Row, Rows, Cell

* All accept extra props `widthPadding` which will add padding to cell


### tableUtil

* `getRowKeyGroup` now rename to `calculateMetaData`

# 0.7.1

### Table

* Add dataPostModifier props

# 0.7.0

### Common

* Upgrade React

# 0.6.1

### scrollUtil

* Better wheelScrollEventHandler API

### SyncScroll

* Hotfix wheel event's bug of HorizontalScroll


# 0.6.0

### scrollUtil

* Expose new util:  normalizePos and wheelScrollEventHandler

### SyncScroll

* add example of bind sync scroll in other dom


# 0.5.5

### Row

* Add props modifier : data -> VDOM (Row) -> VDOM (Row)

### ScrollArea

* Add props rowModifier : data -> VDOM (Row) -> VDOM (Row)
  pass to `Row`

### Table

* Add props  rowModifier : data -> VDOM (Row) -> VDOM (Row)
  pass to `ScrollArea`




