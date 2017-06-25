import React, { Component } from 'react';
import { Provider } from 'react-redux';
import routes from './routes';
import { Router, hashHistory } from 'react-router';


export default class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <Router history={hashHistory} routes={routes} />
      </Provider>
    );
  }
}
