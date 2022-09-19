import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import styles from './Login.style';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {setCurrentUser} from '../../redux/authSlice';
import {setTheme} from '../../redux/themeSlice';
import {auth} from '../../utilities/firebase';
import {setItem} from '../../utilities/asyncStorage';
import {checkLogin,showLoginError} from '../../utilities/authCheck';

const Login = ({navigation}) => {
  //Necessary states are created.
  const theme = useSelector(state => state.theme.theme);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  //The entered information is checked and entered into firebase. Then this information is saved to storage and redux.
  const login = async () => {
    setLoading(true);
    const res=checkLogin(email,password);
    if(res===1){
      try {
        await signInWithEmailAndPassword(auth,email,password);
        await setItem('@userData', {email,password,userName:''});
        await setItem('@themeData', 'light');
        dispatch(setCurrentUser({email,password,userName:''}));
        dispatch(setTheme('light'));
      } catch (error) {
        showLoginError(error.code);
      }
    }
    setLoading(false);
  };

  //Here is the transition to the sign up page.
  const goToSignup = () => {
    navigation.navigate('Signup');
  };

  //Here, inputs for user data and button are pressed to the screen.
  return (
    <SafeAreaView style={styles[theme].container}>
      <View style={styles[theme].wrapper}>
        <Icon name='snapchat' color={theme==='light' ? '#000' : '#B9C0C8'} size={60} />
        <Text style={styles[theme].header}>Log In</Text>
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
        </View>
        <Button title="Log In" loading={loading} onClick={login} />
        <Text style={styles[theme].signupText}>New To Snapchat?</Text>
        <Button title="Sign Up" onClick={goToSignup} />
      </View>
    </SafeAreaView>
  );
};

export default Login;
