import React from 'react';
import createDetectElementResize from '../detectElementResize';
import { normalizePos, getPositionInPx } from './util';

import './scroll.css';

class HorizontalScroll extends React.PureComponent {
  static defaultProps = {
    viewWidth: 0,
    contentWidth: 0,
    position: 0,
    enableWheel: true,
    onScroll: () => {},
    style: {},
  };

  state = {
    indicatorWidth: 0,
  };

  indicator = null;
  root = null;
  detectElementResize = null;
  dragging = false;
  barWidth = 0;
  barLeft = 0;
  startPos = 0;
  pos = 0;
  posWhenDragStart = 0;

  componentDidMount() {
    this.detectElementResize = createDetectElementResize();
    this.detectElementResize.addResizeListener(this.root, this.onResize);
    this.root.parentNode.addEventListener('wheel', this.onWheelScroll);
  }

  componentWillReceiveProps(nextProps) {
    this.getIndicatorWidth(nextProps);
  }

  componentWillUnmount() {
    window.document.removeEventListener('mousemove', this.dragMove);
    if (this.detectElementResize) {
      this.detectElementResize.removeResizeListener(this.root, this.onResize);
    }
    if (this.root) {
      this.root.parentNode.removeEventListener('wheel', this.onWheelScroll);
    }
  }

  onResize = () => {
    const { left, width } = this.root.getBoundingClientRect();
    this.barLeft = left || 0;
    this.barWidth = width || 0;
    this.getIndicatorWidth(this.props);
  };

  onWheelScroll = e => {
    const { enableWheel, position } = this.props;
    if (enableWheel) {
      getPositionInPx(e.deltaX)({
        barSize: this.barWidth,
        indicatorSize: this.state.indicatorWidth,
        position: position,
      })(newPositionInPx => {
        this.updateScroll(newPositionInPx);
        e.stopPropagation();
        e.preventDefault();
      });
    }
  };

  getIndicatorWidth = ({ viewWidth, contentWidth }) => {
    if (contentWidth) {
      this.setState({
        indicatorWidth: viewWidth / contentWidth * this.barWidth,
      });
    }
  };

  onClickBar = e => {
    if (!this.dragging) {
      // the new position is click poistion - indicatorWidth/2;
      const clickPos = e.clientX - this.barLeft;
      let pos = clickPos - this.state.indicatorWidth / 2;
      this.updateScroll(pos);
    }
  };

  getScrollPosition = () => {
    if (this.dragging) {
      const delta = this.pos - this.startPos;
      const pos = delta + this.posWhenDragStart;
      this.updateScroll(pos);
    }
  };

  updateScroll = position => {
    this.props.onScroll(
      normalizePos({
        barSize: this.barWidth,
        indicatorSize: this.state.indicatorWidth,
        positionInPx: position,
      })
    );
  };

  dragStart = e => {
    this.dragging = true;
    window.document.addEventListener('mousemove', this.dragMove);
    window.document.addEventListener('mouseup', this.dragEnd);
    this.initDrag(e);
  };

  initDrag = $event => {
    this.startPos = $event.clientX;
    this.pos = $event.clientX;
    this.posWhenDragStart =
      this.props.position * (this.barWidth - this.state.indicatorWidth);
  };

  dragEnd = () => {
    setTimeout(() => {
      this.dragging = false;
    }, 1);
    window.document.removeEventListener('mousemove', this.dragMove);
    window.document.removeEventListener('mouseup', this.dragEnd);
  };

  dragMove = $event => {
    this.pos = $event.clientX;
    window.requestAnimationFrame(this.getScrollPosition);
  };

  render() {
    const { props } = this;
    const { viewWidth, contentWidth, position, style } = props;

    if (viewWidth < contentWidth) {
      const positionPixel =
        position * (this.barWidth - this.state.indicatorWidth);
      return (
        <div
          className="bt-scroll-bar bt-horizontal-scroll-bar"
          onClick={this.onClickBar}
          ref={el => (this.root = el)}
          style={{ position: 'absolute', ...style }}
        >
          <div
            className="bt-scroll-indicator"
            ref={el => (this.indicator = el)}
            style={{
              transitionDuration: '0ms',
              display: 'block',
              transform: `translate3d(${positionPixel}px, 0px, 0px)`,
              width: this.state.indicatorWidth,
            }}
            onMouseDown={this.dragStart}
          />
        </div>
      );
    }

    return (
      <div ref={el => (this.root = el)} style={{ visibility: 'hidden' }} />
    );
  }
}

export default HorizontalScroll;
