/* eslint-disable no-unused-vars */
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BackgroundImage from '../../assets/image/9307421.png';
import {Link} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../../assets/styles';
import axios from 'axios';
// import {asyncLogin as loginAction} from '../../redux/actions/auth';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Portal, Modal, Button, TouchableRipple} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {asyncRegister} from '../../redux/actions/authActions';
import {deleteMessage} from '../../redux/reducers/authReducers';

const validationSchema = Yup.object({
  username: Yup.string().required('Invalid username address'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Password cannot be empty'),
});

export default function Register() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const message = useSelector(state => state.auth.registerMessage);

  const [showPassword, setShowPassword] = useState(false);
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleShowPass = () => {
    setShowPassword(!showPassword);
  };

  const doRegister = values => {
    dispatch(asyncRegister(values));
  };

  useEffect(() => {
    if (message) {
      showModal();
    }
  }, [message]);

  const handleOkey = () => {
    // clearData();
    dispatch(deleteMessage());
    hideModal();
  };

  return (
    <SafeAreaView style={styles.saveArea}>
      <ImageBackground
        source={BackgroundImage}
        resizeMode="cover"
        style={styles.image}>
        <ScrollView style={styles.outer}>
          <View style={styles.container}>
            <View style={styles.registerHeader}>
              <Text style={styles.authTitle}>Register</Text>
            </View>
            <Portal>
              <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={styles.containerStyle}
                style={styles.modalStyle}>
                {message && (
                  <View style={styles.iconFailed}>
                    <AntDesign name="close" color="white" size={30} />
                  </View>
                )}
                <Text style={styles.textCenter}>{message}</Text>
                <TouchableRipple
                  style={styles.buttonHeight}
                  onPress={handleOkey}>
                  <Button style={styles.button}>
                    <Text style={styles.colorWhite}>Ok</Text>
                  </Button>
                </TouchableRipple>
              </Modal>
            </Portal>
            <Formik
              style={styles.formikStyle}
              initialValues={{
                username: '',
                email: '',
                password: '',
              }}
              validationSchema={validationSchema}
              onSubmit={doRegister}>
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
                      style={styles.input}
                      placeholder="Username"
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      value={values.username}
                    />
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
                          size={20}
                          color="#0a0a0a"
                        />
                      </TouchableOpacity>
                    </View>
                    {errors.password && touched.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                  </View>
                  <View style={styles.forgotContainer}>
                    <Text style={styles.subtitle}>
                      Already have an account?
                    </Text>
                    <TouchableOpacity>
                      <Link to="/Login" style={styles.subtitle}>
                        Log In
                      </Link>
                    </TouchableOpacity>
                  </View>
                  <TouchableRipple
                    onPress={handleSubmit}
                    style={styles.buttonContainer}>
                    <Text style={styles.textButton}>Register</Text>
                  </TouchableRipple>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
