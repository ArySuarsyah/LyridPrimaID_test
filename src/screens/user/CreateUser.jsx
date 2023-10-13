/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView, TextInput} from 'react-native';
import {Button, TouchableRipple, Modal, Portal} from 'react-native-paper';
import React from 'react';
import http from '../../helper/http';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import styles from '../../assets/styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {deleteMessage} from '../../redux/reducers/authReducers';
import {useNavigation} from '@react-navigation/native';

const validationSchema = Yup.object({
  name: Yup.string(),
  job: Yup.string(),
});

export default function CreateUser() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [message, setMessage] = React.useState();
  const [errorMessage, setErrorMessage] = React.useState('');

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleButtonSave = async values => {
    try {
      const inputData = {
        name: values.name,
        job: values.job,
      };
      const {data} = await http().post('api/users', inputData, {
        Headers: {
          'Content-Type': 'application/json',
        },
      });
      if (data) {
        setMessage(data);
        setSuccess(!success);
      }
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  React.useEffect(() => {
    if (success) {
      showModal();
    }
  }, [success]);

  const handleOkey = () => {
    dispatch(deleteMessage());
    navigation.navigate('Profile');
    hideModal();
  };

  return (
    <ScrollView>
      <View
        style={{
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          height: 600,
        }}>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.containerStyle}
            style={styles.modalStyle}>
            {errorMessage && (
              <View style={styles.iconFailed}>
                <AntDesign name="close" color="white" size={30} />
              </View>
            )}
            {success && (
              <View style={styles.iconSuccess}>
                <AntDesign name="check" color="white" size={30} />
              </View>
            )}
            <View style={{justifyContent: 'center'}}>
              {errorMessage && <Text>Update Failed</Text>}
              {success && <Text>Create Success</Text>}
              {errorMessage && (
                <Text style={styles.textCenter}>{errorMessage}</Text>
              )}
              {success && (
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <Text>Name :</Text>
                    <Text style={styles.textCenter}>{message.name}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text>Job :</Text>
                    <Text style={styles.textCenter}>{message.job}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text>Updated at :</Text>
                    <Text style={styles.textCenter}>
                      {moment(message.updatedAt).format('MMMM Do YYYY, h:mm')}
                    </Text>
                  </View>
                </View>
              )}
            </View>
            <TouchableRipple style={styles.buttonHeight} onPress={handleOkey}>
              <Button style={styles.button}>
                <Text style={styles.colorWhite}>Ok</Text>
              </Button>
            </TouchableRipple>
          </Modal>
        </Portal>
        <Formik
          initialValues={{
            name: '',
            job: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleButtonSave}>
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View
              style={{
                backgroundColor: '#fff',
                padding: 20,
                gap: 20,
                width: 300,
                height: 320,
                borderRadius: 10,
                elevation: 2,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  marginVertical: 10,
                }}>
                Create User
              </Text>
              <View>
                <Text>Name</Text>
                <TextInput
                  label="Name"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  placeholder="Enter name"
                />
              </View>
              <View>
                <Text>Job</Text>
                <TextInput
                  label="Job"
                  value={values.job}
                  onChangeText={handleChange('job')}
                  onBlur={handleBlur('job')}
                  placeholder="Enter Job"
                />
              </View>
              <Button mode="contained" onPress={handleSubmit}>
                Save
              </Button>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}
