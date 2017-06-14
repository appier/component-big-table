import React from 'react';
import { List, Map } from 'immutable';

import './keySorter.css';

class KeySelectSortWidget extends React.PureComponent {
  static defaultProps = {
    dragPointer: '::',
    dataKey: List(),
    onChange: () => {},
  };

  dragging = false;
  animating = false;

  state = {
    draggingItem: null,
    dataKey: this.props.dataKey,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataKey !== this.props.dataKey) {
      this.setState({ dataKey: nextProps.dataKey });
      this.dragging = false;
      this.animating = false;
    }
  }

  componentWillUnmount() {
    window.document.removeEventListener('dragend', this.dragEnd);
    this.cleanDragObj();
  }

  cleanDragObj = () => {
    if (this.draggingObj) {
      this.draggingObj.remove();
    }
  };

  dragStart = item => {
    return e => {
      if (this.dragging) {
        e.dataTransfer.effectAllowed = 'move';
        window.document.addEventListener('dragend', this.dragEnd);
        this.draggingObj = e.target.cloneNode(true);
        const boundingRect = e.target.getBoundingClientRect();
        const height = boundingRect.height || 0;
        const width = boundingRect.width || 0;
        this.draggingObj.style.width = width + 'px';
        this.draggingObj.style.height = height + 'px';
        this.draggingObj.style.position = 'fixed';
        this.draggingObj.style.zIndex = '-1';
        this.draggingObj.style.top = '-9999px';
        e.target.parentNode.appendChild(this.draggingObj);
        e.dataTransfer.setDragImage(this.draggingObj, 0, 0);
        this.setState({
          draggingItem: item,
        });
      } else {
        e.preventDefault();
      }
    };
  };

  setDragging = () => {
    this.dragging = true;
  };

  dragEnd = e => {
    this.setState({
      draggingItem: null,
    });
    this.props.onChange(this.state.dataKey);
    this.cleanDragObj();
    this.dragging = false;
    this.animating = false;
    window.document.removeEventListener('dragend', this.dragEnd);
  };

  dragOver = hoveredItem => {
    return e => {
      if (!this.animating) {
        this.animating = true;
        window.requestAnimationFrame(this.updateDataKey(hoveredItem));
      }
      e.preventDefault();
    };
  };

  updateDataKey = hoveredItem => {
    return () => {
      let { dataKey: newDataKey, draggingItem } = this.state;
      if (draggingItem) {
        const draggingItemIndex = newDataKey.indexOf(draggingItem);
        const hoverIndex = newDataKey.indexOf(hoveredItem);
        newDataKey = newDataKey.splice(draggingItemIndex, 1);
        newDataKey = newDataKey.splice(hoverIndex, 0, draggingItem);
        this.setState({ dataKey: newDataKey }, () => {
          this.animating = false;
        });
      }
    };
  };

  deleteKey = item => {
    return () => {
      let { dataKey: newDataKey } = this.props;
      newDataKey = newDataKey.filter(d => d !== item);
      this.props.onChange(newDataKey);
    };
  };

  render() {
    const { state, props } = this;
    const { dragPointer } = props;
    const { draggingItem, dataKey } = state;

    return (
      <div className="bt-key-sorter">
        <div className="sort-region">
          {dataKey.map(d => {
            const key = d.get('key');
            const name = d.get('label');
            const sortItemCx = ['sort-item'];

            if (d === draggingItem) {
              sortItemCx.push('dragging');
            }

            return (
              <div
                key={key}
                className={sortItemCx.join(' ')}
                draggable="true"
                onDragOver={this.dragOver(d)}
                onDragStart={this.dragStart(d)}
              >
                <span className="drag-pointer" onMouseDown={this.setDragging}>
                  {dragPointer}
                </span>
                <span className="name">{name}</span>
                <span className="remove-icon" onClick={this.deleteKey(d)}>
                  ×
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default KeySelectSortWidget;
