import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import './index.css';
import App from './app';
import { store } from './store/store';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

Sentry.init({
  dsn: 'https://ce88c11ee28e4c32b5bea9629f3ad2f2@o1079106.ingest.sentry.io/6083740',
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
