import 'babel-polyfill';
import React from 'react';
import Helmet from 'react-helmet';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import packageConf from '../../package.json';
import Home from './Home';

render((
  <div>
    <Helmet
      title={`${packageConf.name} ${packageConf.version}`}
      meta={[
        {
          name: 'description',
          content: `${packageConf.description}`,
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        },
      ]}
    />
    <Router history={browserHistory}>
      <Route path="/" component={Home} />
    </Router>
  </div>
), document.getElementById('root')); //eslint-disable-line
