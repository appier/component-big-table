import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import AutoSizer from '../src/AutoSizer/AutoSizer';

const stories = storiesOf('AutoSizer', module);

class AutoSizerExample extends React.PureComponent {
  state = {
    width: 0,
    height: 0,
  };

  onResize = ({ width, height }) => {
    this.setState({ width, height });
  };

  render() {
    const { state } = this;
    const { width, height } = state;
    return (
      <div
        className="container"
        style={{
          width: '40vw',
          height: '30vh',
          minWidth: '400px',
          minHeight: '80px',
        }}
      >
        <AutoSizer onResize={this.onResize}>
          <div>
            Resize browser to see how this change
            <div>
              current Size: {width}x{height}
            </div>
          </div>
        </AutoSizer>
      </div>
    );
  }
}

stories.addWithInfo('AutoSizer', '', () => <AutoSizerExample />, {
  inline: true,
  source: false,
});
