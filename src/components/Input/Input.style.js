import {StyleSheet} from 'react-native';

//Here the basic styles of the input are created.
const basicStyles=StyleSheet.create({
  container: {
    width: '90%',
    height: 45,
    paddingHorizontal: 15,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    marginLeft: 5,
    flex: 1,
  },
});

//Here the changing styles of the Login screen are created.
const styles = {
  light: StyleSheet.create({
    ...basicStyles,
    container:{
      ...basicStyles.container,
      backgroundColor: '#F7F7F7',
    },
    input:{
      ...basicStyles.input,
      color: '#B9C0C8'
    }
  }),
  dark: StyleSheet.create({
    ...basicStyles,
    container:{
      ...basicStyles.container,
      backgroundColor: '#B9C0C8',
    },
    input:{
      ...basicStyles.input,
      color: '#333'
    }
  }),
};

export default styles;
