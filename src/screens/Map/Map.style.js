import {StyleSheet} from 'react-native';

//Here the styles of the Map screen are created.
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFC00',
  },
  image: {
    width: '90%',
    height: '90%',
    borderRadius: 20,
  },
});

export default styles;
