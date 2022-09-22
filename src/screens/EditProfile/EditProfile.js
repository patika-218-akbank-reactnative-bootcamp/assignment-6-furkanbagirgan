import React, {useState} from 'react';
import {Alert, SafeAreaView, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { useHeaderHeight } from '@react-navigation/elements';
import { updateEmail,updatePassword } from "firebase/auth";

import styles from './EditProfile.style';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {setCurrentUser} from '../../redux/authSlice';
import {auth} from '../../utilities/firebase';
import {updateItem} from '../../utilities/asyncStorage';
import {checkSignup, showSignupError} from '../../utilities/authCheck';

const EditProfile = () => {
  //Necessary context data and states are created.
  const userSession = useSelector(state => state.auth.currentUser);
  const theme = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(userSession.email);
  const [password, setPassword] = useState(userSession.password);
  const [userName, setUserName] = useState(userSession.userName);
  const headerHeight = useHeaderHeight();

  //Changed user data here is updated via context and storage.
  const save = async () => {
    setLoading(true);
    try {
      const userData = {
        ...userSession,
        email,
        password,
        userName,
      };
      const res=checkSignup(email,password,password,userName);
      if(res!==0){
        await updateItem('@userValue', userData);
        if(userSession.email !== email){
          await updateEmail(auth.currentUser,email);
        }
        if(userSession.password !== password){
          await updatePassword(auth.currentUser,password);
        }
        dispatch(setCurrentUser(userData));
        Alert.alert('Profile Update','The profile has been successfully updated.');
      }
    } catch (error) {
      showSignupError(error.code);
    }
    setLoading(false);
  };

  //Here, the inputs to update the user data and the save button are pressed on the screen.
  return (
    <SafeAreaView
      style={{...styles[theme].container,paddingBottom:headerHeight}}>
      <Input
        placeholder="Email"
        theme={theme}
        value={email}
        iconName="mail"
        onChangeText={setEmail}
      />
      <Input
        placeholder="Password"
        theme={theme}
        value={password}
        iconName="lock-closed"
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Input
        placeholder="User Name"
        theme={theme}
        value={userName}
        iconName="at"
        onChangeText={setUserName}
      />
      <View style={styles[theme].buttonWrapper}>
        <Button title="Save" loading={loading} onClick={save} />
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
