/* eslint-disable import/default */

import React              from 'react';
import { render }         from 'react-dom';
import { browserHistory } from 'react-router';
import { AppContainer }   from 'react-hot-loader';
import Root               from './Root';

import {store} from './store/configureStore';
import { syncHistoryWithStore } from 'react-router-redux';

//Style
require('./favicon.ico');
import './styles/styles.scss';

// Create an enhanced history that syncs navigation events with the store
// const history = syncHistoryWithStore(browserHistory, store);


render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./Root', () => {
    const NewRoot = require('./Root').default;
    render(
      <AppContainer>
        <NewRoot store={store}/>
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
