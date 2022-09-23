import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useSelector} from 'react-redux';

import EditProfile from './../screens/EditProfile';
import PreviewImage from './../screens/PreviewImage';
import SeeImage from './../screens/SeeImage';
import Theme from './../screens/Theme';
import Tabs from './Tabs';

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
          headerTitle: 'Preview Image',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="SeeImage"
        component={SeeImage}
        options={({route}) => ({
          headerStyle: {backgroundColor: theme === 'light' ? '#FFF' : '#000'},
          headerTitleAlign: 'center',
          headerTintColor: '#B9C0C8',
          headerTitle: '@' + route.params.userName,
          headerShadowVisible: false,
        })}
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
