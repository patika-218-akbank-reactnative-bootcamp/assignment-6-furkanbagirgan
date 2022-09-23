import {Dimensions, StyleSheet} from 'react-native';

//Here the basic styles of the Home screen are created.
const basicStyles=StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B9C0C8'
  },
  buttonWrapper: {
    width: '100%',
    height: 110,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20
  },
  imageContainer: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B9C0C8'
  },
  imageWrapper: {
    width: 50,
    height: 50,
    marginLeft: 8,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  imageTitle: {
    color: '#555',
    marginLeft: 5
  },
  iconWrapper:{
    width: 34,
    height: 34,
    borderRadius: 15,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 13,
    right:10,
  }
});

//Here the styles of the Home screen are created.
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
      backgroundColor: '#555'
    }
  })
};

export default styles;
