import {StyleSheet} from 'react-native';

//Here the styles of the PreviewImage screen are created.
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorWrapper: {
    flex: 9,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  image: {
    flex:12,
  },
  bottomContainer:{
    flex:1,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems:'center',
    padding: 10,
    backgroundColor: '#B9C0C8'
  }
});

export default styles;
