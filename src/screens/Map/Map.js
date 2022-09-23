import {query, onSnapshot, collection, where} from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

import {db} from '../../utilities/firebase';
import styles from './Map.style';

const Map = ({navigation}) => {
  //Necessary context data and states are created.
  const [data, setData] = useState([]);

  useEffect(() => {
    //User information that is the same as the current user's id is retrieved from
    //the Firestore and saved in the user state.
    const q = query(collection(db, 'users'), where('image', '!=', ''));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const users = [];
      querySnapshot.forEach(doc => {
        users.push({
          id: doc.data().id,
          image: doc.data().image,
          userName: doc.data().userName,
          location: doc.data().location,
        });
      });
      setData([...users]);
    });

    //The unsubscribe function is executed when the screen is closed.
    return () => {
      unsubscribe();
    };
  }, []);

  //navigate to SeeImage screen
  const seeDetail = user => {
    navigation.navigate('SeeImage', {
      image: user.image,
      userName: user.userName,
    });
  };

  //Here, the flatlist that will appear on the screen are created.
  return (
    <MapView
      style={styles.container}
      initialRegion={{
        latitude: 39.164139,
        longitude: 34.093762,
        latitudeDelta: 20,
        longitudeDelta: 30,
      }}>
      {data.map(item => (
        <Marker
          key={item.id}
          coordinate={{
            latitude: item.location.latitude,
            longitude: item.location.longitude,
          }}
          onPress={() => seeDetail(item)}>
          <View style={styles.imageWrapper}>
            <Image source={{uri: item.image}} style={styles.image} />
          </View>
        </Marker>
      ))}
    </MapView>
  );
};

export default Map;
