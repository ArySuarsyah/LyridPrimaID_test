/* eslint-disable no-unused-vars */
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Link} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {SafeAreaView} from 'react-native-safe-area-context';
// import {asyncLogin as loginAction} from '../../redux/actions/auth';
// import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Portal, Modal, Button, TouchableRipple} from 'react-native-paper';
// import {deleteMessage} from '../../redux/reducers/authReducers';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Password cannot be empty'),
});

export default function Login() {
  // const dispatch = useDispatch();
  // const errorMessage = useSelector(state => state.auth.loginMessage);
  const [showPassword, setShowPassword] = useState(false);
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleShowPass = () => {
    setShowPassword(!showPassword);
  };

  const doLogin = values => {
    // dispatch(loginAction(values));
    console.log('ok');
  };

  // useEffect(() => {
  //   if (errorMessage) {
  //     showModal();
  //   }
  // }, [errorMessage]);

  // const handleOkey = () => {
  //   // clearData();
  //   dispatch(deleteMessage());
  //   hideModal();
  // };

  return (
    <SafeAreaView style={styles.saveArea}>
      <LinearGradient
        colors={['rgba(0, 204, 255, 100)', 'rgba(255, 255, 255, 0.55)']}
        style={styles.linearGradient}
      />
      <ScrollView style={styles.outer}>
        <View style={styles.container}>
          <View style={styles.registerHeader}>
            <Text style={styles.authTitle}>Log In</Text>
            <View style={styles.subTitleContainer}>
              <Text style={styles.subtitle}>Hi, Welcome back to Eventify!</Text>
            </View>
          </View>
          <Formik
            style={styles.formikStyle}
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={doLogin}>
            {({
              handleBlur,
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.formContainer}>
                <View style={styles.inputParent}>
                  <TextInput
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={values.email}
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                  <View style={styles.inputPasswordContainer}>
                    <TextInput
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      style={styles.inputPassword}
                      placeholder="Password"
                      secureTextEntry={!showPassword}
                      value={values.password}
                    />
                    <TouchableOpacity onPress={handleShowPass}>
                      <Octicons
                        name={showPassword ? 'eye' : 'eye-closed'}
                        size={24}
                        color="#dedede"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password && touched.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>
                <View style={styles.forgotContainer}>
                  <Link to={'/ForgotPassword'} style={styles.forgotLink}>
                    Forgot Password?
                  </Link>
                </View>
                <TouchableRipple
                  onPress={handleSubmit}
                  style={styles.buttonContainer}>
                  <Text style={styles.textButton}>Log In</Text>
                </TouchableRipple>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  saveArea: {
    height: '100%',
    position: 'relative',
    backgroundImage: 'linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)',
  },
  outer: {
    position: 'absolute',
    height: 'screen',
    backgroundColor: 'rgba(255,255,255,0.0)',
  },
  container: {
    padding: 10,
    flex: 1,
    borderBlockColor: 'rgba(255,255,255,0.0)',
  },
  registerHeader: {
    padding: 45,
    gap: 5,
    justifyContent: 'center',
  },
  authTitle: {fontSize: 24, color: 'black'},
  subTitleContainer: {flexDirection: 'row'},
  subtitleLink: {color: 'blue', fontSize: 18},
  formContainer: {
    padding: 15,
    borderRadius: 10,
    gap: 20,
    flex: 1,
    margin: 5,
  },
  inputParent: {padding: 10, gap: 20},
  input: {
    color: 'black',
    padding: 10,
    height: 60,
    width: 315,
    borderWidth: 1,
    borderColor: '#dedede',
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
    borderColor: '#dedede',
  },
  inputPassword: {flexGrow: 1, flexDirection: 'column', color: 'black'},
  forgotContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 40,
  },
  buttonContainer: {
    backgroundColor: '#018383',
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
});
