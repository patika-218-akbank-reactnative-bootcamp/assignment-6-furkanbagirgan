import {Dimensions, StyleSheet} from 'react-native';

//Here the styles of the ImageCard are created.
const styles=StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#F7F7F7'
  },
  wrapper:{
    width: '90%',
    height: '100%',
    flexDirection:'row',
    alignItems: 'center'
  },
  imageWrapper: {
    width: 70,
    height: 70,
    alignSelf: 'flex-start',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: '#B9C0C8',
    fontWeight: 'bold',
    fontSize: 16,
	  flexShrink: 1,
    marginLeft: 10,
  },
});

export default styles;
