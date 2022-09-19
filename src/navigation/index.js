import React, {useCallback, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector,useDispatch} from 'react-redux';

import AuthStack from './AuthStack';
import ContentStack from './ContentStack';
import {setCurrentUser} from '../redux/authSlice';
import {setTheme} from '../redux/themeSlice';
import {getItem} from '../utilities/storage';

const Navigation = () => {
  //The currentUser information is accessed with the useSelector hook. 
  //setTheme and setCurrentUser function is accessed with the useDispatch hook.
  const userSession = useSelector(state => state.auth.currentUser);
  const dispatch = useDispatch();

  //It makes the getUserData function run when the application is first launched.
  useEffect(()=>{
    getUserData();
  },[getUserData]);

  //Checking if there is any user data saved in the storage. If there is, this user and theme information is saved in redux.
  const getUserData = useCallback(async () => {
    const user = await getItem('@userData');
    const theme = await getItem('@themeData');
    if(user !== 0 || theme !== 0){
      dispatch(setCurrentUser(user));
      dispatch(setTheme(theme));
    }
  }, [dispatch]);

  //Here, the appropriate navigation structure is displayed on the screen according to the userSession status.
  return (
    <NavigationContainer>
      {userSession.email ? <ContentStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
