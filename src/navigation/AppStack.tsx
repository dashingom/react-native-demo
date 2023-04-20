import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Profile from '../screens/Profile';
import User from '../screens/User';

export type AppStackParamList = {
  Profile: undefined;
  User: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName={'Profile'}>
      <Stack.Screen name="Profile" component={Profile} options={{title: 'User Profile'}} />
      <Stack.Screen name="User" component={User} options={{title: 'User List'}} />
    </Stack.Navigator>
  );
};

export default AppStack;
