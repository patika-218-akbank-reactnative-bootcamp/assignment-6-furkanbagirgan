import Icon from '@expo/vector-icons/Feather';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {useSelector} from 'react-redux';

import Home from './../screens/Home';
import Map from './../screens/Map';
import Profile from './../screens/Profile';

const Tab = createBottomTabNavigator();

//Here, the tabs required for the bottom navigation are created and the necessary configs are made.
const Tabs = () => {
  //The theme information is accessed with the useSelector hook.
  const theme = useSelector(state => state.theme.theme);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        //Here the tabBar icon is set according to the page name.
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let iconColor;
          const iconSize = 26;
          if (route.name === 'Home') {
            iconName = 'camera';
            iconColor = focused ? 'blue' : 'white';
          } else if (route.name === 'Map') {
            iconName = 'map-pin';
            iconColor = focused ? 'green' : 'white';
          } else if (route.name === 'Profile') {
            iconName = 'user';
            iconColor = focused ? 'red' : 'white';
          }

          return <Icon name={iconName} size={iconSize} color={iconColor} />;
        },
        tabBarStyle: {borderTopColor: '#000'},
        headerStyle: {backgroundColor: theme === 'light' ? '#FFF' : '#000'},
        headerTintColor: '#B9C0C8',
        headerTitleAlign: 'center',
        tabBarActiveBackgroundColor: '#000',
        tabBarInactiveBackgroundColor: '#000',
        tabBarShowLabel: false,
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
