import React from 'react';
import createDetectElementResize from '../detectElementResize';

class AutoSizer extends React.PureComponent {
  static defaultProps = {
    onResize: () => {},
  };

  autoSizer = null;
  parentNode = null;
  detectElementResize = null;

  componentDidMount() {
    this.parentNode = this.autoSizer.parentNode;
    this.detectElementResize = createDetectElementResize();
    this.detectElementResize.addResizeListener(this.parentNode, this.onResize);
    this.onResize();
  }

  componentWillUnmount() {
    if (this.detectElementResize) {
      this.detectElementResize.removeResizeListener(
        this.parentNode,
        this.onResize
      );
    }
  }

  onResize = () => {
    const boundingRect = this.parentNode.getBoundingClientRect();
    const height = boundingRect.height || 0;
    const width = boundingRect.width || 0;

    const style = window.getComputedStyle(this.parentNode) || {};
    const paddingLeft = parseInt(style.paddingLeft, 10) || 0;
    const paddingRight = parseInt(style.paddingRight, 10) || 0;
    const paddingTop = parseInt(style.paddingTop, 10) || 0;
    const paddingBottom = parseInt(style.paddingBottom, 10) || 0;

    this.props.onResize({
      height: height - paddingTop - paddingBottom,
      width: width - paddingLeft - paddingRight,
    });
  };

  render() {
    return (
      <div ref={el => (this.autoSizer = el)} style={{ overflow: 'visible' }}>
        {this.props.children}
      </div>
    );
  }
}

export default AutoSizer;
