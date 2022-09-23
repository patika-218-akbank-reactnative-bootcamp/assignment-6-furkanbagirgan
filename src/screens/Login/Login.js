import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {collection, query, where, getDocs} from 'firebase/firestore';
import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {SafeAreaView, Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import Button from '../../components/Button';
import Input from '../../components/Input';
import {setCurrentUser} from '../../redux/authSlice';
import {setTheme} from '../../redux/themeSlice';
import {setItem} from '../../utilities/asyncStorage';
import {checkLogin, showLoginError} from '../../utilities/authCheck';
import {auth, db} from '../../utilities/firebase';
import styles from './Login.style';

const Login = ({navigation}) => {
  //Necessary states are created.
  const theme = useSelector(state => state.theme.theme);
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const dispatch = useDispatch();

  //The entered information is checked and entered into firebase. Then this information is saved to storage and redux.
  const login = async data => {
    setLoading(true);
    const res = checkLogin(data.email, data.password);
    if (res === 1) {
      try {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        const q = query(
          collection(db, 'users'),
          where('id', '==', auth.currentUser.uid),
        );
        const querySnapshot = await getDocs(q);
        await setItem('@userData', {
          email: data.email,
          password: data.password,
          userName: querySnapshot.docs[0].data().userName,
        });
        await setItem('@themeData', 'light');
        dispatch(
          setCurrentUser({
            email: data.email,
            password: data.password,
            userName: querySnapshot.docs[0].data().userName,
          }),
        );
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
        <Icon
          name="snapchat"
          color={theme === 'light' ? '#000' : '#B9C0C8'}
          size={60}
        />
        <Text style={styles[theme].header}>Log In</Text>
        <View style={styles[theme].formContainer}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                theme={theme}
                placeholder="Email"
                iconName="mail"
                keyboardType="email-address"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text style={styles[theme].errorText}>This field is required*</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                theme={theme}
                placeholder="Password"
                iconName="lock-closed"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text style={styles[theme].errorText}>This field is required*</Text>
          )}
        </View>
        <Button
          title="Log In"
          loading={loading}
          onClick={handleSubmit(login)}
        />
        <Text style={styles[theme].signupText}>New To Snapchat?</Text>
        <Button title="Sign Up" onClick={goToSignup} />
      </View>
    </SafeAreaView>
  );
};

export default Login;
