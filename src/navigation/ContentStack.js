import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import Tabs from './Tabs';
import PreviewImage from './../screens/PreviewImage';
import SeeImage from './../screens/SeeImage';
import EditProfile from './../screens/EditProfile';
import Theme from './../screens/Theme';

const Stack = createNativeStackNavigator();

//It is the navigation structure that will be displayed when the login is still made.
const ContentStack = () => {
  //The theme information is accessed with the useSelector hook.
  const theme = useSelector(state => state.theme.theme);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PreviewImage"
        component={PreviewImage}
        options={{
          headerStyle: {backgroundColor: theme === 'light' ? '#FFF' : '#000'},
          headerTitleAlign: 'center',
          headerTintColor: '#B9C0C8',
          headerTitle: '',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="SeeImage"
        component={SeeImage}
        options={{
          headerStyle: {backgroundColor: theme === 'light' ? '#FFF' : '#000'},
          headerTitleAlign: 'center',
          headerTintColor: '#B9C0C8',
          headerTitle: '',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Theme"
        component={Theme}
        options={{
          headerStyle: {backgroundColor: theme === 'light' ? '#FFF' : '#000'},
          headerTitleAlign: 'center',
          headerTintColor: '#B9C0C8',
          headerTitle: 'Select Theme',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerStyle: {backgroundColor: theme === 'light' ? '#FFF' : '#000'},
          headerTitleAlign: 'center',
          headerTintColor: '#B9C0C8',
          headerTitle: 'Edit Profile',
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ContentStack;
