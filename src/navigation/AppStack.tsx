import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Profile from '../screens/Profile';

export type AppStackParamList = {
  Profile: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName={'Profile'}>
      <Stack.Screen name="Profile" component={Profile} options={{title: 'User Profile'}} />
    </Stack.Navigator>
  );
};

export default AppStack;
