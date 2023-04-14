import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import Auth from './src/components/Auth';
import User from './src/components/User';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <Auth />
        {/* <Text testID="titleLabel" style={styles.title}>
          Users
        </Text> */}

        {/* <User /> */}
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0066cc',
    paddingTop: 40,
    textAlign: 'center',
  },
});

export default App;
