import React from 'react';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';

// import {AuthProvider} from './src/context/OktaCustomSignInContext';
import {AuthProvider} from './src/context/OktaBrowserSignInContext';
import {MainRouter} from './src/navigation';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <AuthProvider>
        <MainRouter />
      </AuthProvider>
    </Provider>
  );
}

export default App;
