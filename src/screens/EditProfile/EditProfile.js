import React, {useState,useEffect} from 'react';
import {Alert, SafeAreaView, View, Image, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { useHeaderHeight } from '@react-navigation/elements';
import { updateEmail,updatePassword } from "firebase/auth";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { useForm, Controller } from "react-hook-form";
import Icon from '@expo/vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

import styles from './EditProfile.style';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {setCurrentUser} from '../../redux/authSlice';
import {auth,db,storage} from '../../utilities/firebase';
import {updateItem} from '../../utilities/asyncStorage';
import {checkSignup, showSignupError} from '../../utilities/authCheck';

const EditProfile = () => {
  //Necessary context data and states are created.
  const userSession = useSelector(state => state.auth.currentUser);
  const theme = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [user,setUser] = useState({});
  const [profileImage,setProfileImage]=useState(null);
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: userSession.email,
      password: userSession.password,
      userName: userSession.userName
    }
  });
  const headerHeight = useHeaderHeight();

  //User information that is the same as the current user's id is retrieved from
  //the Firestore and saved in the user state.
  const getUserData = async()=>{
    const q = query(collection(db, "users"), where("id", "==", auth.currentUser.uid ));
    const querySnapshot = await getDocs(q);
    setUser({...querySnapshot.docs[0].data(),docId:querySnapshot.docs[0].id});
    const imageProfile=querySnapshot.docs[0].data().profileImage;
    if(imageProfile!==''){
      setProfileImage(imageProfile);
    }
  }

  //The getUserData function is executed when the screen is first opened.
  useEffect(()=>{
    getUserData();
  },[]);

  //Changed user data here is updated via context, storage and firebase.
  const save = async (data) => {
    setLoading(true);
    try {
      const userData = {
        email:data.email,
        password:data.password,
        userName:data.userName,
      };
      const res=checkSignup(data.email,data.password,data.password,data.userName);
      if(res!==0){
        //
        await updateItem('@userData', userData);
        if(userSession.email !== data.email){
          await updateEmail(auth.currentUser,data.email);
        }
        if(userSession.password !== data.password){
          await updatePassword(auth.currentUser,data.password);
        }
        //If profileImage is null , space is assigned to the image object because removePhoto is selected.
        //If not, the old user image is reassigned.
        let image= profileImage===null ? '' : user.profileImage;
        if(profileImage!==null && profileImage!==user.profileImage){
          const result=await uploadPhoto();
          if(result!==''){
            image=result;
          }
        }
        else{
          //If profileImage state is null then removePhoto is selected.
          //Thus, the existing image is deleted from the firebase storage.
          if(user.profileImage!==''){
            const fileRef = ref(storage,user.id+'-profileImg');
            await deleteObject(fileRef);
          }
        }
        await updateDoc(doc(db,'users',user.docId), {
          email: data.email,
          userName: data.userName,
          profileImage: image
        });
        dispatch(setCurrentUser(userData));
        Alert.alert('Profile Update','The profile has been successfully updated.');
      }
    } catch (error) {
      console.log(error);
      showSignupError(error.code);
    }
    setLoading(false);
  };

  //The picture selected from the gallery is turned into a blob and saved to firebase storage.
  const uploadPhoto=async()=>{
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
        xhr.open("GET", profileImage, true);
        xhr.send(null);
      });
    
      //If there is an image in the firebase storage before, that image is deleted first and then the new image created is saved.
      const fileRef = ref(storage,user.id+'-profileImg');
      if(user.profileImage!==''){
        await deleteObject(fileRef);
      }
      await uploadBytes(fileRef, blob);
      blob.close();
      return await getDownloadURL(fileRef);
    }
    catch(error){
      Alert.alert('Network Error','Please check your internet connection!');
      return '';
    }
  }

  //This function allows the user to select pictures by camera or gallery.
  const editPhoto=async()=>{
    Alert.alert('Edit Photo','Please select the photo option', [
      {  
        text: 'Camera',  
        onPress: async() => {
          let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
          });
          if (!result.cancelled) {
            setProfileImage(result.uri);
          }
        },    
      },  
      {
        text: 'Gallery',
        onPress: async() => {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
          if (!result.cancelled) {
            setProfileImage(result.uri);
          }
        }}
    ]);
  }

  //Changing profileImage state to null.
  const removePhoto=()=>{
    setProfileImage(null);
  }

  //Here, the inputs to update the user data and the save button are pressed on the screen.
  return (
    <SafeAreaView
      style={{...styles[theme].container,paddingBottom:headerHeight}}>
      <View style={styles[theme].imageWrapper}>
        {profileImage!==null ?
          <Image
            source={{uri:  profileImage }}
            style={styles[theme].image}
          />
          :
          <Icon name='user' color={theme === 'light' ? '#B9C0C8' : '#F2F2F2'} size={80} />
        }
        <View style={styles[theme].iconsContainer}>
          <View style={styles[theme].photoIconWrapper}>
            <Icon name='edit-2' color='#F2F2F2' size={16} onPress={editPhoto} />
          </View>
          <View style={styles[theme].photoIconWrapper}>
            <Icon name='trash' color='#F2F2F2' size={16} onPress={removePhoto}/>
          </View>
        </View>
      </View>
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
      <View style={styles[theme].buttonWrapper}>
        <Button title="Save" loading={loading} onClick={handleSubmit(save)} />
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
