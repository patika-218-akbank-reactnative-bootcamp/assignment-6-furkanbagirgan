import {StyleSheet} from 'react-native';

//Here the styles of the button are created.
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 50,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: '#FFFC00',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default styles;
