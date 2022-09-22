import {StyleSheet} from 'react-native';

//Here the basic styles of the edit profile screen are created.
const basicStyles=StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  buttonWrapper:{
    marginTop: 15
  }
});

//Here the styles of the edit profile screen are created.
const styles = {
  light:StyleSheet.create({
    ...basicStyles,
    container: {
      ...basicStyles.container,
      backgroundColor: 'white',
    },
  }),
  dark:StyleSheet.create({
    ...basicStyles,
    container: {
      ...basicStyles.container,
      backgroundColor: '#000',
    },
  })
};

export default styles;
