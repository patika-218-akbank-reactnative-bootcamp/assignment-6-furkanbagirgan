import {StyleSheet,StatusBar, Dimensions} from 'react-native';

//Here the basic styles of the SeeImage screen are created.
const basicStyles=StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  errorWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  musicContainer: {
    width:'100%',
  },
  loadingContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

//Here the changing styles of the SeeImage screen are created.
const styles = {
  light: StyleSheet.create({
    ...basicStyles,
    container: {
      ...basicStyles.container,
      backgroundColor: 'white',
    },
    loadingContainer:{
      ...basicStyles.loadingContainer,
      backgroundColor: '#FFF'
    }
  }),
  dark: StyleSheet.create({
    ...basicStyles,
    container: {
      ...basicStyles.container,
      backgroundColor: '#191414',
    },
    loadingContainer:{
      ...basicStyles.loadingContainer,
      backgroundColor: '#191414'
    }
  }),
};

export default styles;
