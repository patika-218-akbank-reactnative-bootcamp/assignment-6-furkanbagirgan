import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {useSelector} from 'react-redux';

import styles from './PreviewImage.style';

const PreviewImage = ({navigation}) => {
  //Necessary context data and states are created.
  const theme = useSelector(state => state.theme.theme);

  //Here, the flatlist that will appear on the screen are created.
  return (
    <SafeAreaView
      style={styles[theme].container}>
      <Text>Heyy</Text>
    </SafeAreaView>
  );
};

export default PreviewImage;
