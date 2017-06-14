import React from 'react';
import { configure, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';


setAddon(infoAddon);

configure(() => {
  require('../stories');
  require('../stories/autoSizer');
  require('../stories/syncScroll');
  require('../stories/row');
  require('../stories/scrollArea');
  require('../stories/tableHeader');
  require('../stories/table');
  require('../stories/keySorter');
  require('../stories/dataKeyCreator');
}, module);
