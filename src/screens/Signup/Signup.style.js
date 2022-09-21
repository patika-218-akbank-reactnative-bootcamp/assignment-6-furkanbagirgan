import {StyleSheet} from 'react-native';

//Here the basic styles of the Signup screen are created.
const basicStyles=StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15
  },
  errorText: {
    color:'red'
  },
  header: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  formContainer: {
    marginTop: 20,
    marginBottom: 10
  },
});

//Here the changing styles of the Signup screen are created.
const styles = {
  light: StyleSheet.create({
    ...basicStyles,
    container:{
      ...basicStyles.container,
      backgroundColor: '#F2F2F2',
    },
    wrapper:{
      ...basicStyles.wrapper,
      backgroundColor: '#FFF',
    },
    header:{
      ...basicStyles.header,
      color: '#000'
    }
  }),
  dark: StyleSheet.create({
    ...basicStyles,
    container:{
      ...basicStyles.container,
      backgroundColor: '#000',
    },
    wrapper:{
      ...basicStyles.wrapper,
      backgroundColor: '#555',
    },
    header:{
      ...basicStyles.header,
      color: '#B9C0C8',
    }
  }),
};

export default styles;
