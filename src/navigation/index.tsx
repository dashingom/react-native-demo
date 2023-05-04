import {ActivityIndicator, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
// import {useAuth} from '../context/OktaCustomSignInContext';
import {useAuth} from '../context/OktaBrowserSignInContext';

export const MainRouter = () => {
  const authState = useAuth();
  // const {loading, authenticated} = authState.values;
  const {authenticated} = authState.values;

  // if (loading) {
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  return <NavigationContainer>{authenticated ? <AppStack /> : <AuthStack />}</NavigationContainer>;
};
