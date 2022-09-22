import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Icon from '@expo/vector-icons/Ionicons';

import styles from "./Theme.style";
import { setTheme } from "../../redux/themeSlice";
import { removeItem, setItem } from "../../utilities/asyncStorage";

const Theme = () => {
  //Necessary context data and states are created.
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  //Here, the existing theme is changed according to the clicked theme.
  const changeTheme = async (themeName) => {
    await removeItem("@themeData");
    await setItem("@themeData", themeName);
    dispatch(setTheme(themeName));
  };

  //Here, 2 themes and their names are printed on the screen.
  return (
    <SafeAreaView style={styles[theme].container}>
      <View style={styles[theme].themeWrapper}>
        <TouchableWithoutFeedback onPress={() => changeTheme("light")}>
          <View style={styles[theme].lightTheme}>
            <Icon name='sunny-outline' size={60} color='#A9A9A9' />
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles[theme].themeText}>Light</Text>
      </View>
      <View style={styles[theme].themeWrapper}>
        <TouchableWithoutFeedback onPress={() => changeTheme("dark")}>
          <View style={styles[theme].darkTheme}>
            <Icon name='moon-outline' size={60} color='#A9A9A9' />
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles[theme].themeText}>Dark</Text>
      </View>
    </SafeAreaView>
  );
};

export default Theme;
