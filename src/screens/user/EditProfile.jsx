import {View, Text, ScrollView, TextInput} from 'react-native';
import {Button} from 'react-native-paper';
import React from 'react';
import {useSelector} from 'react-redux';
import http from '../../helper/http';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {getUserData} from '../../redux/reducers/profile';
import {useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

const validationSchema = Yup.object({
  name: Yup.string(),
  job: Yup.string(),
});

export default function EditProfile() {
  const dispacth = useDispatch();
  const token = useSelector(state => state.auth.token);
  const userID = useSelector(state => state.users.userId);

  const getUser = React.useCallback(async () => {
    const {data} = await http(token).get('/profile');
    if (data.success) {
      dispacth(getUserData(data.results));
    }
  }, [token, dispacth]);

  useFocusEffect(() => {
    getUser();
  });

  console.log(userID);

  const handleButtonSave = () => {
    console.log('ok');
  };

  return (
    <ScrollView>
      <View
        style={{
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          height: 600,
          borderWidth: 1,
          borderColor: 'black',
        }}>
        <Formik
          initialValues={{
            name: '',
            job: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleButtonSave}>
          {({handleBlur, handleChange, values}) => (
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
                Upadate Profile
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
              <Button mode="contained" onPress={() => console.log('Pressed')}>
                Save
              </Button>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}
