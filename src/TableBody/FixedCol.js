import React from 'react';

import './table.css';

class FixedCol extends React.PureComponent {
  static defaultProps = {
    width: 0,
    height: 0,
    addShadow: false,
  };

  render() {
    const { props } = this;
    const { width, height, children, addShadow } = props;

    const shadowClassName = addShadow
      ? 'bt-fixed-col-shadow enable'
      : 'bt-fixed-col-shadow ';
    return (
      <div
        style={{
          position: 'absolute',
          left: 0,
          width,
          height,
          zIndex: 2,
        }}
      >
        {children}
        <div className={shadowClassName} />
      </div>
    );
  }
}

export default FixedCol;
