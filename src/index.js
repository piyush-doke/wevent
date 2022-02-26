import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {test} from './aws';
import {store, persistor} from './store.js';
import { Provider } from 'react-redux';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bulma/css/bulma.min.css';
import Amplify from 'aws-amplify';
import config from './config';
import * as serviceWorker from './serviceWorker';

Amplify.configure({
  Auth: {
      mandatorySignIn: true,
      region: config.cognito.REGION,
      userPoolId: config.cognito.USER_POOL_ID,
      userPoolWebClientId: config.cognito.APP_CLIENT_ID
  }
});

ReactDOM.render(
  <Provider store={store} persistor={persistor}>
      <App />
  </Provider>,
  document.getElementById('root')
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorker.register();

