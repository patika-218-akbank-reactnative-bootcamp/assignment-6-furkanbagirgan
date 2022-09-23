import React, { useState } from 'react';
import {SafeAreaView, Image, View, Text, Alert} from 'react-native';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateDoc, doc } from "firebase/firestore";

import styles from './PreviewImage.style';
import Button from './../../components/Button/Button';
import {db,storage} from '../../utilities/firebase';

const PreviewImage = ({navigation,route}) => {
  //Necessary context data and states are created.
  const {image,user} = route.params;
  const [loading,setLoading] =useState(false);

  //The picture is turned into a blob and saved to firebase storage.
  const share=async()=>{
    setLoading(true);
    try{
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image, true);
        xhr.send(null);
      });
    
      //Image saved to firebase storage.
      const fileRef = ref(storage,user.id+'-sharedImg');
      await uploadBytes(fileRef, blob);
      blob.close();
      const imagePath=await getDownloadURL(fileRef);
      await updateDoc(doc(db,'users',user.docId), {
        image: imagePath
      });
      Alert.alert('Image Share','Picture successfully shared');
      navigation.goBack();
    }
    catch(error){
      Alert.alert('Network Error','Please check your internet connection!');
      return '';
    } finally{
      setLoading(false);
    }
  }

  //Here, the flatlist that will appear on the screen are created.
  return (
    <SafeAreaView
      style={styles.container}>
      {image!=='' ?
        <>
          <Image
            source={{uri:  image}}
            style={styles.image}
          />
          <View style={styles.bottomContainer}>
            <Button title='Share' onClick={share} loading={loading}/>
          </View>
        </>
        :
        <View style={styles.errorWrapper}>
          <Text style={styles.errorText}>Image selection failed.</Text>
        </View>
      }
    </SafeAreaView>
  );
};

export default PreviewImage;
