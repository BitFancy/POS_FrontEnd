import React from 'react';
import ReactDOM from 'react-dom';
import Main from './EntryFile/Main';
import { isElectron } from './InitialPage/utils';
import { createBrowserHistory, createHashHistory } from 'history';
import 'alertifyjs/build/css/alertify.css';
import 'alertifyjs/build/css/themes/semantic.css';
import AuthProvider from './context/AuthContext';
import GeneralContextProvider from './context/GeneralContext';
import './services/i18n';

export const history = isElectron()
  ? createHashHistory()
  : createBrowserHistory();

ReactDOM.render(
  // <React.StrictMode>
  <AuthProvider>
    <GeneralContextProvider>
      <React.Suspense fallback="Loading...">
        <Main />
      </React.Suspense>
    </GeneralContextProvider>
  </AuthProvider>,
  // </React.StrictMode>,
  document.getElementById('app')
);

if (module.hot) {
  // enables hot module replacement if plugin is installed
  module.hot.accept();
}
