import React from 'react';
import './table.css';

class WidthAdjuster extends React.Component {
  static defaultProps = {
    minWidth: 40,
    originalWidth: 40,
    index: 0,
    update: () => {},
  };

  state = {
    dragging: false,
    barPosion: 0,
  };

  startPos = null;
  pos = null;
  mounting = true;

  componentWillUnmount() {
    window.document.removeEventListener('mousemove', this.dragMove);
    this.mounting = false;
  }

  dragStart = e => {
    this.setState({
      dragging: true,
    });
    window.document.addEventListener('mousemove', this.dragMove);
    window.document.addEventListener('mouseup', this.dragEnd);
    this.initDrag(e);
  };

  initDrag = $event => {
    this.startPos = $event.clientX;
    this.pos = $event.clientX;
  };

  dragEnd = () => {
    const { update } = this.props;
    if (this.mounting) {
      this.props.update(this.props.originalWidth + this.state.barPosion);
      this.setState({
        dragging: false,
        barPosion: 0,
      });
    }
    window.document.removeEventListener('mousemove', this.dragMove);
    window.document.removeEventListener('mouseup', this.dragEnd);
  };

  dragMove = $event => {
    this.pos = $event.clientX;
    window.requestAnimationFrame(this.getDragPosition);
  };

  getDragPosition = () => {
    const { minWidth, originalWidth } = this.props;
    if (this.state.dragging) {
      let delta = this.pos - this.startPos;
      // console.log(delta, minWidth - originalWidth)
      if (minWidth - originalWidth > delta) {
        delta = minWidth - originalWidth;
      }
      this.setState({
        barPosion: delta,
      });
    }
  };

  render() {
    const { state, props } = this;
    const { dragging, barPosion } = state;

    return (
      <div className="bt-width-adjuster" onMouseDown={this.dragStart}>
        {dragging
          ? <div
              className="bt-bar"
              style={{
                transitionDuration: '0ms',
                transform: `translate3d(${barPosion}px, 0px, 0px)`,
              }}
            />
          : <div className="bt-ind" />}
      </div>
    );
  }
}

export default WidthAdjuster;
