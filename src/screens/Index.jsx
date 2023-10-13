/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {profileData} from '../redux/reducers/profile';
import styles from '../assets/styles';
import {resourceData} from '../redux/reducers/resourceReducers';
import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import http from '../helper/http';
import {TouchableRipple} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/dist/Entypo';

export default function Index() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.dataUser);
  const profile = useSelector(state => state.profile.data);
  const resourceList = useSelector(state => state.resource.data);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);

  const getUser = useCallback(async () => {
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

  const getData = useCallback(
    async (page = 1) => {
      const {data} = await http().get('api/{resource}', {
        params: {page},
      });
      if (data) {
        dispatch(resourceData(data.data));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    getData(page);
  }, [getData, page]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <SafeAreaView style={styles.saveArea}>
      {/* <ImageBackground
        source={BackgroundImage}
        resizeMode="cover"
        style={styles.image}> */}
      <View style={{position: 'relative'}}>
        <TouchableRipple onPress={() => navigation.navigate('Profile')}>
          <View
            style={{
              height: 200,
              backgroundColor: '#007eff',
              paddingHorizontal: 30,
            }}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                gap: 15,
                paddingVertical: 30,
              }}>
              <Image
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 80,
                  justifyContent: 'center',
                }}
                source={{
                  uri: `${profile.avatar}`,
                }}
              />
              <View>
                <View style={{flexDirection: 'row', gap: 5}}>
                  <Text style={{color: '#fff', fontSize: 16}}>
                    {profile.first_name}
                  </Text>
                  <Text style={{color: '#fff', fontSize: 16}}>
                    {profile.last_name}
                  </Text>
                </View>
                <Text style={{color: '#dedede', fontSize: 16}}>
                  {profile.email}
                </Text>
              </View>
            </View>
          </View>
        </TouchableRipple>
        <View
          style={{
            padding: 20,
            gap: 10,
            backgroundColor: '#fff',
            height: '100%',
          }}>
          <Text style={{fontSize: 20, color: '#007eff', fontWeight: 'bold'}}>
            Source List
          </Text>
          <View
            style={{
              flexDirection: 'column',
              gap: 5,
              flex: 4,
            }}>
            {resourceList.map(item => {
              return (
                <TouchableRipple
                  key={item.id}
                  onPress={() => console.log(item.id)}>
                  <View
                    style={{
                      height: 80,
                      padding: 10,
                      backgroundColor: `${item.color}`,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{fontSize: 20, color: '#fff'}}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableRipple>
              );
            })}
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
      </View>
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
}
