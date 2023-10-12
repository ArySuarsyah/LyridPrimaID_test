/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {profileData} from '../redux/reducers/profile';
import styles from '../assets/styles';
import {resourceData} from '../redux/reducers/resourceReducers';
import React, {useCallback, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import http from '../helper/http';
import {TouchableRipple} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Index() {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.dataUser);
  const profile = useSelector(state => state.profile.data);
  const resourceList = useSelector(state => state.resource.data);

  const getUser = useCallback(async () => {
    const {data} = await http().get(`/api/users/${userData.id}`);
    dispatch(profileData(data.data));
  }, [userData.id, dispatch]);

  const getData = useCallback(async () => {
    const {data} = await http().get('api/{resource}');
    if (data) {
      dispatch(resourceData(data.data));
    }
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <SafeAreaView style={styles.saveArea}>
      {/* <ImageBackground
        source={BackgroundImage}
        resizeMode="cover"
        style={styles.image}> */}
      <View style={{position: 'relative'}}>
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
                      height: 85,
                      padding: 10,
                      backgroundColor: `${item.color}`,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{fontSize: 20, color: '#fff'}}>
                      {item.name}
                    </Text>
                    <AntDesign name="right" size={30} color="#fff" />
                  </View>
                </TouchableRipple>
              );
            })}
          </View>
        </View>
      </View>
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
}