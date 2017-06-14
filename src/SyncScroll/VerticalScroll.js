import React from 'react';
import createDetectElementResize from '../detectElementResize';
import { normalizePos, getPositionInPx } from './util';

import './scroll.css';

class VerticalScroll extends React.PureComponent {
  static defaultProps = {
    viewHeight: 0,
    contentHeight: 0,
    position: 0,
    enableWheel: true,
    onScroll: () => {},
  };

  state = {
    indicatorHeight: 0,
  };

  indicator = null;
  root = null;
  detectElementResize = null;
  dragging = false;
  barHeight = 0;
  barTop = 0;
  startPos = 0;
  pos = 0;
  posWhenDragStart = 0;

  componentDidMount() {
    this.detectElementResize = createDetectElementResize();
    this.detectElementResize.addResizeListener(this.root, this.onResize);
    this.root.parentNode.addEventListener('wheel', this.onWheelScroll);
  }

  componentWillReceiveProps(nextProps) {
    this.getIndicatorHeight(nextProps);
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
    const { top, height } = this.root.getBoundingClientRect();
    this.barTop = top || 0;
    this.barHeight = height || 0;
    this.getIndicatorHeight(this.props);
  };

  onWheelScroll = e => {
    const { enableWheel, position } = this.props;
    if (enableWheel) {
      getPositionInPx(e.deltaY)({
        barSize: this.barHeight,
        indicatorSize: this.state.indicatorHeight,
        position,
      })(newPositionInPx => {
        this.updateScroll(newPositionInPx);
        e.stopPropagation();
        e.preventDefault();
      });
    }
  };

  getIndicatorHeight = ({ viewHeight, contentHeight }) => {
    if (contentHeight) {
      this.setState({
        indicatorHeight: viewHeight / contentHeight * this.barHeight,
      });
    }
  };

  onClickBar = e => {
    if (!this.dragging) {
      // the new position is click poistion - indicatorHeight/2;
      const clickPos = e.clientY - this.barTop;
      let pos = clickPos - this.state.indicatorHeight / 2;
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
        barSize: this.barHeight,
        indicatorSize: this.state.indicatorHeight,
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
    this.startPos = $event.clientY;
    this.pos = $event.clientY;
    this.posWhenDragStart =
      this.props.position * (this.barHeight - this.state.indicatorHeight);
  };

  dragEnd = () => {
    setTimeout(() => {
      this.dragging = false;
    }, 1);
    window.document.removeEventListener('mousemove', this.dragMove);
    window.document.removeEventListener('mouseup', this.dragEnd);
  };

  dragMove = $event => {
    this.pos = $event.clientY;
    window.requestAnimationFrame(this.getScrollPosition);
  };

  render() {
    const { props } = this;
    const { viewHeight, contentHeight, position, style } = props;

    if (viewHeight < contentHeight) {
      const positionPixel =
        position * (this.barHeight - this.state.indicatorHeight);
      return (
        <div
          className="bt-scroll-bar bt-vertical-scroll-bar"
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
              transform: `translate3d(0px, ${positionPixel}px, 0px)`,
              height: this.state.indicatorHeight,
            }}
            onMouseDown={this.dragStart}
          />
        </div>
      );
    }

    return (
      <div
        className="bt-scroll-bar bt-vertical-scroll-bar"
        ref={el => (this.root = el)}
        style={style}
      />
    );
  }
}

export default VerticalScroll;
