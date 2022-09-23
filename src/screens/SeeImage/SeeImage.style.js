import {StyleSheet} from 'react-native';

//Here the styles of the SeeImage screen are created.
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
    flex:1,
  },
});

export default styles;
