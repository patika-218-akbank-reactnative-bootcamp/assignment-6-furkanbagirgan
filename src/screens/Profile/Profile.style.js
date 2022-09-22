import {StyleSheet} from 'react-native';

//Here the basic styles of the Profile screen are created.
const basicStyles=StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  imageWrapper: {
    width: 150,
    height: 150,
    marginBottom: 5,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  userName: {
    fontSize: 16,
    marginBottom: 20,
    color: '#B9C0C8',
  },
  buttonContainer:{
    height: 180,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15
  },
});

//Here the changing styles of the Profile screen are created.
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
  }),
};

export default styles;
