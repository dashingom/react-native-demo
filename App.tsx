import React from 'react';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';

// import {AuthProvider} from './src/context/OktaCustomSignInContext';
import {AuthProvider} from './src/context/OktaBrowserSignInContext';
import {MainRouter} from './src/navigation';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <AuthProvider>
        <PaperProvider>
          <MainRouter />
        </PaperProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
