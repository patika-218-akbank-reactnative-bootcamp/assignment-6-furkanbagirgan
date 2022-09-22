import React, { useEffect,useState } from 'react';
import {View, Image, SafeAreaView, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { useHeaderHeight } from '@react-navigation/elements';
import { signOut } from 'firebase/auth';
import { doc, onSnapshot } from "firebase/firestore";
import Icon from '@expo/vector-icons/Feather';

import styles from './Profile.style';
import Button from '../../components/Button';
import {resetUser} from '../../redux/authSlice';
import {removeItem} from '../../utilities/asyncStorage';
import {auth,db} from '../../utilities/firebase';

const Profile = ({navigation}) => {
  //Necessary states are created.
  const theme = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();
  const [user,setUser] = useState({});
  const headerHeight = useHeaderHeight();


  //The unsubscribe function is executed when the screen is first opened.
  useEffect(()=>{
    //User information that is the same as the current user's id is retrieved from
    //the Firestore and saved in the user state.
    const unsubscribe  = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
      setUser(doc.data());
    });

    return ()=>{
      unsubscribe();
    }
  },[]);

  //Here is the transition to the theme screen.
  const goTheme = () => {
    navigation.navigate('Theme',{theme});
  };

  //Here is the transition to the profile screen.
  const goEditProfile = () => {
    navigation.navigate('EditProfile',{theme});
  };

  //Here, user and theme is deleted via context and storage. Then sign out from firebase.
  const logout = async () => {
    await removeItem('@userData');
    await removeItem('@themeData');
    dispatch(resetUser());
    await signOut(auth);
  };

  //Here, the user picture, logout button and buttons that switch to other pages are printed on the screen.
  return (
    <SafeAreaView
      style={{...styles[theme].container,paddingBottom:headerHeight}}>
      <View style={styles[theme].imageWrapper}>
        {user.profileImage? 
          <Image
            source={{uri:  user.profileImage}}
            style={styles[theme].image}
          />
          :
          <Icon name='user' color={theme === 'light' ? '#B9C0C8' : '#F2F2F2'} size={80} />
        }
      </View>
      <Text
        style={styles[theme].userName}>
        {user.userName? '@'+user.userName : ''}
      </Text>
      <View style={styles[theme].buttonContainer}>
        <Button title="Theme" onClick={goTheme} />
        <Button title="Edit profile" onClick={goEditProfile} />
        <Button title="Log out" onClick={logout} />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
