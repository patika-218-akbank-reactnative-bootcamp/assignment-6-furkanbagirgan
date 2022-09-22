import {Dimensions, StyleSheet} from 'react-native';

//Here the basic styles of the home screen are created.
const basicStyles=StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  errorWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  listContainer: {
    width:'100%',
    height: 270,
    marginBottom: 10,
  },
  musicTitle:{
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
  },
  musicContainer: {
    width:'100%',
  },
  columnWrapper:{
    justifyContent: 'space-between'
  },
  loadingContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

//Here the styles of the home screen are created.
const styles = {
  light:StyleSheet.create({
    ...basicStyles,
    container: {
      ...basicStyles.container,
      backgroundColor: 'white',
    },
    musicTitle: {
      ...basicStyles.musicTitle,
      color: '#A9A9A9'
    },
    loadingContainer:{
      ...basicStyles.loadingContainer,
      backgroundColor: '#FFF'
    }
  }),
  dark:StyleSheet.create({
    ...basicStyles,
    container: {
      ...basicStyles.container,
      backgroundColor: '#191414',
    },
    musicTitle: {
      ...basicStyles.musicTitle,
      color: '#FFF'
    },
    loadingContainer:{
      ...basicStyles.loadingContainer,
      backgroundColor: '#191414'
    }
  })
};

export default styles;
