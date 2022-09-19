import React from 'react';
import {View, Image, Text} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

import styles from './ImageCard.style';

const ImageCard = ({image,handlePress}) => {
  //Here, the incoming name is displayed on the screen together
  //with image, description and vote.
  return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.imageWrapper}>
            <Image
              source={{uri: image}}
              style={styles.image}
            />
          </View>
          <Text style={styles.title}>Uploaded Image</Text>
        </View>
        <Icon name='trash' size={25} color='red' onPress={handlePress} />
      </View>
  );
};

export default ImageCard;
