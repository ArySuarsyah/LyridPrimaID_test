import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  saveArea: {
    height: '100%',
    position: 'relative',
    backgroundColor: '#dedede',
  },
  outer: {
    position: 'absolute',
    height: 'screen',
    backgroundColor: 'rgba(255,255,255,0.0)',
  },
  container: {
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.6)',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    borderBlockColor: 'rgba(255,255,255,0.0)',
    marginHorizontal: 20,
  },
  registerHeader: {
    paddingHorizontal: 15,
    gap: 5,
    justifyContent: 'center',
  },
  authTitle: {fontSize: 24, color: '#518ff3'},
  subTitleContainer: {flexDirection: 'row'},
  subtitleLink: {color: 'blue', fontSize: 18},
  formContainer: {
    borderRadius: 10,
    gap: 20,
    flex: 1,
  },
  inputParent: {padding: 10, gap: 20},
  input: {
    color: 'black',
    padding: 10,
    height: 60,
    width: 315,
    borderWidth: 1,
    borderColor: '#11eae4',
    borderRadius: 12,
  },
  errorText: {color: '#FF0000', alignSelf: 'flex-start', marginHorizontal: 25},
  inputPasswordContainer: {
    borderWidth: 1,
    width: 315,
    flexDirection: 'row',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 20,
    height: 60,
    borderColor: '#11eae4',
  },
  inputPassword: {
    flexGrow: 1,
    flexDirection: 'column',
    color: 'black',
  },
  forgotContainer: {
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 2,
  },
  buttonContainer: {
    backgroundColor: '#40aaec',
    padding: 10,
    borderRadius: 5,
    width: 315,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: 'white',
  },
  linearGradient: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    height: '30%',
    width: '60%',
    alignItems: 'center',
    gap: 20,
  },
  modalStyle: {
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  iconFailed: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ee6363',
  },
  textCenter: {textAlign: 'center'},
  buttonHeight: {height: 40},
  iconSuccess: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#009acd',
  },
  button: {
    width: '30%',
    backgroundColor: '#40aaec',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorWhite: {
    color: 'white',
  },
});

export default styles;
