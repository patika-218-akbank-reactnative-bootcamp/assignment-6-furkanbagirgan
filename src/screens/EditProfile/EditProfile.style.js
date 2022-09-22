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
  },
  errorText: {
    color:'red',
    alignSelf: 'flex-start',
    marginLeft: 15
  },
  imageWrapper: {
    width: 150,
    height: 150,
    marginBottom: 26,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  photoIconWrapper:{
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 16,
    backgroundColor: '#555'
  },
  iconsContainer: {
    width: '55%',
    position: 'absolute',
    bottom: -16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    imageWrapper: {
      ...basicStyles.imageWrapper,
      backgroundColor: '#F2F2F2'
    }
  }),
  dark:StyleSheet.create({
    ...basicStyles,
    container: {
      ...basicStyles.container,
      backgroundColor: '#000',
    },
    imageWrapper: {
      ...basicStyles.imageWrapper,
      backgroundColor: '#B9C0C8'
    }
  })
};

export default styles;
