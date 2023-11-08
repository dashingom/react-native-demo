import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Profile from '../screens/Profile';
import User from '../screens/User';
import PDFViewer from '../components/PDFViewer/PDFViewer';

export type AppStackParamList = {
  Profile: undefined;
  User: undefined;
  PDFViewer: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName={'PDFViewer'}>
      <Stack.Screen name="Profile" component={Profile} options={{title: 'User Profile'}} />
      <Stack.Screen name="User" component={User} options={{title: 'User List'}} />
      <Stack.Screen
        name="PDFViewer"
        component={PDFViewer}
        options={{title: 'Terms and Condition'}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
