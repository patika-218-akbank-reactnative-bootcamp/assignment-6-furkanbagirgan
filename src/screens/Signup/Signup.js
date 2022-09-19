import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { useHeaderHeight } from '@react-navigation/elements';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import styles from './Signup.style';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {setCurrentUser} from '../../redux/authSlice';
import {setTheme} from '../../redux/themeSlice';
import {auth} from '../../utilities/firebase';
import {setItem} from '../../utilities/asyncStorage';
import {checkSignup,showSignupError} from '../../utilities/authCheck';

const Signup = () => {
  //Necessary states are created.
  const theme = useSelector(state => state.theme.theme);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();

  //The entered information is checked and saved to firebase. Then this information is saved to storage and redux.
  const signup = async () => {
    setLoading(true);
    const res=checkSignup(email,password,repeatPassword,userName);
    if(res===1){
      try {
        const user = {
          email,
          password,
          userName,
        };
        await createUserWithEmailAndPassword(auth,email,password);
        await setItem('@userData', user);
        await setItem('@themeData', 'light');
        dispatch(setCurrentUser(user));
        dispatch(setTheme('light'));
      } catch (error) {
        showSignupError(error.code);
      }
    }
    setLoading(false);
  };

  //Here, inputs for user data and button are pressed to the screen.
  return (
    <SafeAreaView style={{...styles[theme].container,paddingBottom:headerHeight}}>
      <View style={styles[theme].wrapper}>
        <Icon name='snapchat' color={theme==='light' ? '#000' : '#B9C0C8'} size={60} />
        <Text style={styles[theme].header}>Sign Up</Text>
        <View style={styles[theme].formContainer}>
          <Input
            theme={theme}
            placeholder="Email"
            value={email}
            iconName="mail"
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Input
            theme={theme}
            placeholder="Password"
            value={password}
            iconName="lock-closed"
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <Input
            theme={theme}
            placeholder="Repeat Password"
            value={repeatPassword}
            iconName="lock-closed"
            onChangeText={setRepeatPassword}
            secureTextEntry={true}
          />
          <Input
            theme={theme}
            placeholder="User Name"
            value={userName}
            iconName="at"
            onChangeText={setUserName}
          />
        </View>
        <Button title="Sign Up" loading={loading} onClick={signup} />
      </View>
    </SafeAreaView>
  );
};

export default Signup;
