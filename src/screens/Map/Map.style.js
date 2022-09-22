import {Dimensions, StyleSheet} from 'react-native';

//Here the basic styles of the Map screen are created.
const basicStyles=StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
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
  musicContainer: {
    width:'100%',
  },
  loadingContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    width: '100%',
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  inputWrapper: {
    width: '75%',
    height: 65,
    paddingVertical: 10,
  },
  buttonWrapper: {
    width: '20%',
    height: 45,
    borderRadius: 15,
    backgroundColor: '#A9A9A9',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//Here the changing styles of the Map screen are created.
const styles = {
  light: StyleSheet.create({
    ...basicStyles,
    container: {
      ...basicStyles.container,
      backgroundColor: 'white',
    },
    loadingContainer:{
      ...basicStyles.loadingContainer,
      backgroundColor: '#FFF'
    }
  }),
  dark: StyleSheet.create({
    ...basicStyles,
    container: {
      ...basicStyles.container,
      backgroundColor: '#191414',
    },
    loadingContainer:{
      ...basicStyles.loadingContainer,
      backgroundColor: '#191414'
    }
  }),
};

export default styles;
