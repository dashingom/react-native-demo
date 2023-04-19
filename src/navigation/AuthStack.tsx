import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Main from '../screens/Main';
import OktaBrowserSignIn from '../screens/OktaBrowserSignIn';
import OktaCustomSignIn from '../screens/OktaCustomSignIn';

export type AuthStackParamList = {
  Main: undefined;
  BrowserSignIn: undefined;
  CustomSignIn: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={Main} options={{headerShown: false}} />
      <Stack.Screen
        name="BrowserSignIn"
        component={OktaBrowserSignIn}
        options={{title: 'Browser Sign In'}}
      />
      <Stack.Screen
        name="CustomSignIn"
        component={OktaCustomSignIn}
        options={{title: 'Custom Sign In'}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
