import {StyleSheet} from 'react-native';

//Here the styles of the input are created.
const styles=StyleSheet.create({
  container: {
    width: '90%',
    height: 45,
    paddingHorizontal: 15,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
  },
  input: {
    marginLeft: 5,
    flex: 1,
  },
});

export default styles;
