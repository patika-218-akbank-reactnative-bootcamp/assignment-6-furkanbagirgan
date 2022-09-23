import React, {useState,useEffect} from 'react';
import {SafeAreaView, Text, View, Image, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from '@expo/vector-icons/Feather';
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';

import styles from './Home.style';
import Button from './../../components/Button/Button';
import {auth,db,storage} from '../../utilities/firebase';

const Home = ({navigation}) => {
  //Necessary context data and states are created.
  const theme = useSelector(state => state.theme.theme);
  const [user,setUser] = useState({});

  useEffect(()=>{
    //User information that is the same as the current user's id is retrieved from
    //the Firestore and saved in the user state.
    const unsubscribe  = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
      setUser({...doc.data(),docId:doc.id});
    });

    //The unsubscribe function is executed when the screen is closed.
    return ()=>{
      unsubscribe();
    }
  },[]);

  //Allows the user to select pictures by camera and navigate previewImage screen.
  const withCamera=async()=>{
    if(user.image===''){
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.5,
      });
      if (!result.cancelled) {
        navigation.navigate('PreviewImage',{image:result.uri,user});
      }
    }
    else{
      Alert.alert('Warning','A picture has already been shared. To share a new picture, you must delete the previous one.');
    }
  }

  //The picture selected from the gallery and navigate previewImage screen.
  const fromGallery=async()=>{
    if(user.image===''){
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.5,
      });
      if (!result.cancelled) {
        navigation.navigate('PreviewImage',{image:result.uri,user});
      }
    }
    else{
      Alert.alert('Warning','A picture has already been shared. To share a new picture, you must delete the previous one.');
    }
  }

  //Deletes the shared photo from firebase storage and firestore.
  const deletePhoto=async()=>{
    const fileRef = ref(storage,user.id+'-sharedImg');
    await deleteObject(fileRef);
    await updateDoc(doc(db,'users',user.docId), {
      image: ''
    });
  }

  //Here are the components that will appear on the screen.
  return (
    <SafeAreaView style={styles[theme].container}>
      <Text style={styles[theme].title}>Share Photo</Text>
      <View style={styles[theme].buttonWrapper}>
        <Button title='With Camera' onClick={withCamera}/>
        <Button title='From Gallery' onClick={fromGallery}/>
      </View>
      <View style={styles[theme].imageContainer}>
        <View style={styles[theme].imageWrapper}>
          {user.image!=='' ?
            <Image
              source={{uri:  user.image}}
              style={styles[theme].image}
            />
            :
            <Icon name='x' color={theme === 'light' ? '#B9C0C8' : '#F2F2F2'} size={32} />
          }
        </View>
        <Text style={styles[theme].imageTitle}>{user.image!=='' ? 'The picture has been shared.' : 'There are no shared images.'}</Text>
        {
          user.image!=='' && <View style={styles[theme].iconWrapper}><Icon name='trash' color='white' size={20} onPress={deletePhoto} /></View>
        }
      </View>
    </SafeAreaView>
  );
};

export default Home;
