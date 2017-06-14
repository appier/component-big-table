import React from 'react';

import './table.css';

class Cell extends React.PureComponent {
  static defaultProps = {
    widthPadding: 0,
    width: 0,
    height: 0,
    className: '',
  };

  render() {
    const { props } = this;
    const { width, widthPadding, height, children, className } = props;

    return (
      <div
        className={`bt-cell ${className}`}
        style={{ width, height, padding: `0 ${widthPadding}px` }}
      >
        {children}
      </div>
    );
  }
}

export default Cell;
