import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Dimensions} from 'react-native';
const screenHeight = Dimensions.get('window').height;
import React, {useContext, useEffect, useState} from 'react';
import Navbar from './Navbar';
import {Button} from 'react-native-elements';
import {AuthContext} from '../context/AuthContext';
import CardArray from './CardArray';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';

const Attendance = ({navigation}) => {
  const {isLogin, userInfo} = useContext(AuthContext);
  const [dataAttendance, setDataAttendance] = useState({
    countIn: 0,
    countOut: 0,
  });
  useEffect(() => {
    fetchDataAttendaceNumber();
  }, []);
  

  const fetchDataAttendaceNumber = async () => {
    try {
      // const response = await axios.get(
      //   'https://hrms-backend-04fw.onrender.com/api/v1/attendance/getPunchInPunchOut',
      // );
      // const data = response.data;
      // console.log(data)
      const apiUrl = 'https://chawlacomponents.com/api/v1/attendance/getPunchInPunchOut';

      const response = await fetch(apiUrl);

      const jsonData = await response.json();

      //console.log('AAKash DOUBT',jsonData);
      setDataAttendance(jsonData);
      
    } catch (error) {
      console.error(error);
    }
  };
 
  const screenHeight = Dimensions.get('window').height;
  const handleAttendance = () => {
    navigation.navigate('TableComp');
  };

  return (
    <View style={{height: screenHeight * 0.8}}>
      <SafeAreaView style={styles.container}>
        <Navbar />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View>
            <TouchableOpacity style={styles.Ftext} onPress={handleAttendance}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}
              >
                <Text
                  style={{color: '#283093', fontSize: 16, fontWeight: '500'}}
                >
                  View Attendance Records
                </Text>
                <Feather size={15} color={'#283093'} name="external-link" />
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <View style={styles.div1}>
              <Text style={styles.HeadTxt}>Daily Staff Check-in</Text>
            </View>
            <View style={styles.subdiv1}>
              <View style={styles.subdiv2}>
                <View style={styles.subdiv3}>
                  <View style={styles.subdiv4}>
                    <Text style={styles.num}>
                      {dataAttendance.countIn}
                    </Text>
                    <Feather name="arrow-up" size={18} color={'#4B0082'} />
                  </View>
                  <Text style={styles.numTxt}>Present</Text>
                </View>
              </View>
              <View style={styles.subdiv2}>
                <View style={styles.subdiv3}>
                  <View style={styles.subdiv4}>
                    <Text style={styles.num}>
                      {dataAttendance.countOut}
                    </Text>
                    <Feather name="arrow-up" size={18} color={'#4B0082'} />
                  </View>
                  <Text style={styles.numTxt}>Absent</Text>
                </View>
              </View>
            </View>
          </View>

          {isLogin ? <CardArray /> : <Text> </Text>}

          {/* {userInfo.employee.role==='supervisor'|| userInfo.employee.role==='admin'? <CardArray /> : <Text> </Text>} */}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
export default Attendance;
const styles = StyleSheet.create({
  Ftext: {
    width: 350,
    height: 52,
    color: '#283093',
    fontSize: 16,
    fontWeight: '500',
    backgroundColor: '#E6E6FA',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 7,
    // marginRight:24,
    justifyContent: 'center',
    marginTop: 15,
    marginLeft: 30,
  },
  scrollContent: {
    flexGrow: 2,
    paddingBottom: 4,
    // paddingVertical: 20,
    // marginBottom: 10,
  },
  container: {
    // flex: 1,
    justifyContent: 'center',
    //  alignItems:'center'
    // paddingHorizontal: 25,
    // paddingVertical: 30,
  },
  div1: {
    paddingTop: 35,
  },

  subdiv1: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 13,
    justifyContent: 'space-evenly',
  },

  subdiv2: {
    width: 20,
    height: 80,
    width: 160,
    padding: 8,
    borderRadius: 9,
    borderWidth: 0.5,
    backgroundColor: '#F0F0F0',
    borderColor: '#C8C8C8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  subdiv3: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subdiv4: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  num: {color: '#4B0082', fontSize: 20, fontWeight: 'bold'},
  numTxt: {fontSize: 11, fontWeight: '400', color: '#000'},

  HeadTxt: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'Inter',
    marginLeft: 17,
  },
});


