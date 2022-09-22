import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { useHeaderHeight } from '@react-navigation/elements';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useForm, Controller } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore";

import styles from './Signup.style';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {setCurrentUser} from '../../redux/authSlice';
import {setTheme} from '../../redux/themeSlice';
import {auth,db} from '../../utilities/firebase';
import {setItem} from '../../utilities/asyncStorage';
import {checkSignup,showSignupError} from '../../utilities/authCheck';

const Signup = () => {
  //Necessary states are created.
  const theme = useSelector(state => state.theme.theme);
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
      userName: ''
    }
  });
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();

  //The entered information is checked and saved to firebase. Then this information is saved to storage and redux.
  const signup = async (data) => {
    setLoading(true);
    const res=checkSignup(data.email,data.password,data.repeatPassword,data.userName);
    if(res===1){
      try {
        const userData = {
          email:data.email,
          password:data.password,
          userName:data.userName,
        };
        const {user}= await createUserWithEmailAndPassword(auth,data.email,data.password);
        await addDoc(collection(db, "users"), {
          id: user.uid,
          email: data.email,
          userName: data.userName,
          location: '',
          image: '',
          profileImage: ''
        });;
        await setItem('@userData', userData);
        await setItem('@themeData', 'light');
        dispatch(setCurrentUser(userData));
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
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
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
          {errors.email && <Text style={styles[theme].errorText}>This field is required*</Text>}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                theme={theme}
                placeholder="Password"
                iconName="lock-closed"
                secureTextEntry={true}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          {errors.password && <Text style={styles[theme].errorText}>This field is required*</Text>}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                theme={theme}
                placeholder="Repeat Password"
                iconName="lock-closed"
                secureTextEntry={true}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="repeatPassword"
          />
          {errors.repeatPassword && <Text style={styles[theme].errorText}>This field is required*</Text>}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                theme={theme}
                placeholder="User Name"
                iconName="at"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="userName"
          />
          {errors.userName && <Text style={styles[theme].errorText}>This field is required*</Text>}
        </View>
        <Button title="Sign Up" loading={loading} onClick={handleSubmit(signup)} />
      </View>
    </SafeAreaView>
  );
};

export default Signup;
