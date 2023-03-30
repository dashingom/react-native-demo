import React from 'react';
import {SafeAreaView} from 'react-native';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import User from './src/components/User';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <User />
      </SafeAreaView>
    </Provider>
  );
}

export default App;
