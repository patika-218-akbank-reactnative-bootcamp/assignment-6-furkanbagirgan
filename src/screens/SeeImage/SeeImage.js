import React from 'react';
import {SafeAreaView, Image, View, Text} from 'react-native';

import styles from './SeeImage.style';

const SeeImage = ({route}) => {
  //Necessary context data and states are created.
  const {image} = route.params;

  //Here are the components that will appear on the screen.
  return (
    <SafeAreaView style={styles.container}>
      {image !== '' ? (
        <Image source={{uri: image}} style={styles.image} />
      ) : (
        <View style={styles.errorWrapper}>
          <Text style={styles.errorText}>An error was viewing the image.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SeeImage;
