import React from 'react';
import {View, TextInput} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

import styles from './Input.style';

function Input(props) {
  //Here the input component is displayed on the screen.
  return (
    <View style={styles.container}>
      <Icon name={props.iconName} size={20} color='#B9C0C8' />
      <TextInput {...props} placeholderTextColor='#B9C0C8' style={styles.input} />
    </View>
  );
}

export default Input;
