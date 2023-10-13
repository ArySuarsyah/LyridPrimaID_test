/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import http from '../../helper/http';
import {TouchableRipple} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {profileData} from '../../redux/reducers/profile';
import {getUsers, editUser} from '../../redux/reducers/userReducers';
import styles from '../../assets/styles';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.profile.data);
  const usersList = useSelector(state => state.users.listUsers);
  const navigation = useNavigation();
  const userData = useSelector(state => state.auth.dataUser);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);

  const getUser = React.useCallback(async () => {
    const {data} = await http().get(`/api/users/${userData.id}`);
    dispatch(profileData(data.data));
  }, [userData.id, dispatch]);

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const getAllUsers = useCallback(
    async (page = 1) => {
      const {data} = await http().get('/api/users', {
        params: {page},
      });
      dispatch(getUsers(data.data));
      setTotalPages(data.total_pages);
    },
    [dispatch],
  );
  React.useEffect(() => {
    getUser();
    getAllUsers(page);
  }, [getUser, getAllUsers, page]);

  const handleEdit = id => {
    dispatch(editUser(id));
    navigation.navigate('EditProfile');
  };

  return (
    <View style={{gap: 50}}>
      <View style={{gap: 20}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            padding: 30,
            backgroundColor: '#007eff',
          }}>
          <View style={styles.userImage}>
            <Image
              source={{
                uri: `${user.avatar}`,
              }}
              width={100}
              height={100}
              style={{borderRadius: 100}}
            />
          </View>
          <View style={{flexDirection: 'row', gap: 5}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#fff'}}>
              {user.first_name}
            </Text>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#fff'}}>
              {user.last_name}
            </Text>
          </View>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#dedede'}}>
            {user.email}
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          marginHorizontal: 10,
          paddingVertical: 20,
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            gap: 20,
            backgroundColor: '#fff',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20}}>User List</Text>
          <TouchableRipple onPress={() => navigation.navigate('CreateUser')}>
            <Ionicons name="add-circle" size={30} />
          </TouchableRipple>
        </View>
        <View>
          {usersList.map(item => {
            return (
              <View
                key={item.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  padding: 10,
                  paddingVertical: 10,
                  justifyContent: 'space-between',
                }}>
                <Image
                  source={{
                    uri: `${item.avatar}`,
                  }}
                  width={50}
                  height={50}
                  style={{borderRadius: 50}}
                />
                <View>
                  <View style={{flexDirection: 'row', gap: 5}}>
                    <Text>{item.first_name}</Text>
                    <Text>{item.last_name}</Text>
                  </View>
                  <Text>{item.email}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: 15,
                    alignItems: 'center',
                    alignSelf: 'end',
                  }}>
                  <TouchableRipple onPress={() => handleEdit(item.id)}>
                    <View style={{padding: 5}}>
                      <AntDesign name="edit" size={20} />
                    </View>
                  </TouchableRipple>
                  <TouchableRipple onPress={() => console.log('okedeh')}>
                    <View style={{padding: 5}}>
                      <AntDesign name="delete" size={18} />
                    </View>
                  </TouchableRipple>
                </View>
              </View>
            );
          })}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 15,
            alignItems: 'center',
            margin: 15,
          }}>
          <TouchableRipple onPress={prevPage}>
            <Entypo name="chevron-with-circle-left" size={30} />
          </TouchableRipple>
          <Text style={{fontSize: 20, width: 50, textAlign: 'center'}}>
            {page}
          </Text>
          <TouchableRipple onPress={nextPage}>
            <Entypo name="chevron-with-circle-right" size={30} />
          </TouchableRipple>
        </View>
      </View>
    </View>
  );
};

export default Profile;
