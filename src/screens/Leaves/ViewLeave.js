import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, StyleSheet, TextInput, Text } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import Navbar from '../Navbar';
import { AuthContext } from '../../context/AuthContext';
 
const ViewLeave = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [tableHead, setTableHead] = useState([
    'Name',
    'From',
    'To',
    'Status',
    'Supervisor',
  ]);
  const widthArr = [120, 120, 120, 120, 120];
  const [dataLeave, setDataLeave] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
 const {userInfo} = useContext(AuthContext)
  useEffect(() => {
    fetchData();
  }, []);
 
  const handleSearch = () => {
    const filtered = dataLeave.filter(item => {
      const searchTextLower = searchText.toLowerCase();
      const employeeId = item.employeeId.toLowerCase();
      const TimePeriod = item.TimePeriod.toLowerCase();
      const Supervisor = userInfo.employee.role
      const status = item.status ? item.status.toLowerCase() : '';
 
      return (
        employeeId.includes(searchTextLower) ||
        TimePeriod.includes(searchTextLower) ||
        Supervisor.includes(searchTextLower) ||
        status.includes(searchTextLower)
      );
    });
 
    setFilteredData(filtered);
  };
 
  const fetchData = async () => {
    console.warn('click happened');
    setIsLoading(true);
 
    try {
      const res = await axios.get('https://hrms-backend-04fw.onrender.com/api/v1/leave/all');
      const parsedData = res?.data;
 
      if (parsedData.success && parsedData.allLeaves) {
        const userData = parsedData.allLeaves;
        const mappedData = userData.map(item => {
          const fromTo = item.fromTo[0];
          const from = new Date(fromTo.from).toLocaleDateString();
          const to = new Date(fromTo.to).toLocaleDateString();
           
          return {
            Name: item.employeeId.name,
            From: from,
            To: to,
            Status: fromTo.status,
            Supervisor:userInfo.employee.name
          };
        });
 
        setDataLeave(mappedData);
        setFilteredData(mappedData);
        setIsLoading(false);
        setIsLogin(true);
        alert('Leave successful');
      } else {
        console.log('Invalid data format:', parsedData);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(`API Error: ${err}`);
      setIsLoading(false);
    }
  };
 
  return (
    <View style={styles.container} >
      <Navbar />
      <ScrollView horizontal={true}>
        <View >
        <View style={{paddingVertical:10}}>
          <Text style={{fontSize:19, fontWeight:'700', color:'black'}}>View Database</Text>
        </View>
          <View style={styles.searchBarContainer}>
            <Icon name="search" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              onChangeText={text => setSearchText(text)}
              onSubmitEditing={handleSearch}
              value={searchText}
            />
          </View>
 
          <Table borderStyle={{backgroundColor: '#ECEDFE' }}>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={styles.header}
              textStyle={styles.text}
            />
          </Table>
 
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              {filteredData.map((rowData, index) => (
                <Row
                  key={index}
                  data={Object.values(rowData)}
                  widthArr={widthArr}
                  style={[{ backgroundColor: 'white' }]}
                  textStyle={styles.Bodytext}
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // borderRadius: 10,
  },
  dataWrapper: {
    borderRadius: 8,
    backgroundColor: '#fff',
    flex: 1,
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
    padding: 5,
    textAlign: 'center',
    fontFamily:'Inter'
  },
  Bodytext:{
    fontFamily:'Inter',
    fontSize:14,
    fontWeight:'400',
    textAlign: 'center',
    padding: 6,
 },
  header: {
    backgroundColor: '#ECEDFE',
    paddingVertical:15,
    marginBottom:12
  },
  row: {
    borderBottomColor: '#C1C0B9',
    borderBottomWidth: 1,
  },
  searchBarContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginTop: 15,
     marginTop:10,
    borderWidth:2,
    elevation:2,
    borderRadius:15,
    borderColor: '#F0F0F0',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
    color: '#333',
  },
  searchInput: {
    fontSize: 16,
    height: 40,
    flex: 1,
  },
});
 
export default ViewLeave;