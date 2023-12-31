import React, {useState, useEffect,useContext} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
// import { Table, Row } from 'react-native-table-component';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import Navbar from './Navbar';
import {Picker} from '@react-native-picker/picker';
import {BASE_URL} from '../ConfigLinks';
import MyAttendance from './MyAttendance';
import Feather from 'react-native-vector-icons/Feather';
import LoadingScreen from './LoadingScreen';
import {AuthContext} from '../context/AuthContext';
// import { BASE_URL } from '../ConfigLinks';

const TableComp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const {userInfo,logout} = useContext(AuthContext);
  
  const {employee} = userInfo;
  const profile=employee? employee.jobProfileId.jobProfileName:null
  const [refreshing, setRefreshing] = useState(false);

  const [columns, setColumns] = useState([
    'Date',
    'Name',
    'Punch-in',
    'Punch-out',
    'status',
    'Apporved/Reject',
  ]);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState(''); // State variable to store the search text
  const [filteredData, setFilteredData] = useState([]); // State variable to store the filtered data
  const [selectedOption, setSelectedOption] = useState('Staff Attandance');
  const[showEmployeePuches,setShowEmployeePunches]=useState(false)
  const [employeeData,setEmployeeData]=useState([])
  const [employeePunch,setEmployeePunch]=useState("")
  const[selectJobProfile,setSelectJobProfile]=useState()
  const [jobProfiles,setJobProfiles]=useState([])
 


  useEffect(() => {
    fetchData();
  }, []);
  useEffect(()=>{
    fetchJobProfile()
  })
  const handleRefresh = () => {
    setRefreshing(true);
    fetchData(); // Call the fetchData function again to refresh the data
    setRefreshing(false);
  };
  const handleSearch = async () => {
    console.warn('search')
 
   

    try {
     
      
      const res = await axios.get(`https://chawlacomponents.com/api/v1/attendance?name=${searchText}`);

      const parsedData = res?.data;
     console.log('apidata', parsedData);
      if (parsedData.success && parsedData.employees) {
        const userData = parsedData.employees;

        const mappedData = userData.map(item => {
          console.log('item111234', item);
          const formatTime = time => {
            return item.punches[0]?.punchIn
              ? new Date(item.punches[0].punchIn).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })
              : 'N/A';
          };

          const punchInTime = item.punches[0]?.punchIn
          ? new Date(item.punches[0].punchIn).toLocaleTimeString([],  { hour: '2-digit', minute: '2-digit', hour12: true })
          : 'N/A';
          const punchOutTime = item.punches[0]?.punchOut
          ? new Date(item.punches[0].punchOut).toLocaleTimeString([],  { hour: '2-digit', minute: '2-digit', hour12: true })
          : 'Null';
          const approvedByValue = item.punches[0]?.approvedBy?.name
          ? item.punches[0]?.approvedBy.name
          : item.punches[0]?.rejectedBy?.name
          ? item.punches[0].rejectedBy.name
          : 'Need Action';

        

          return {
            Date: new Date(item.date).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }),
            name: item.employeeId.name,
            punchIn: punchInTime,
            PunchOut: punchOutTime,
            status: item.punches[0].status,
            Type: 'Pending',
            ApprovedBy: approvedByValue,
          };
        });

        setData(mappedData);
        console.log('renderData', mappedData); // console the
        setFilteredData(mappedData);
        setIsLoading(false);
        setIsLogin(true);
        alert('Attendance data fetched successfully');
      } else {
        console.log('Invalid data format:', parsedData);
        setIsLoading(false);
      }
    } catch (err) {
      console.log('appi err in table', err);
      setIsLoading(false);
    }
  };

  const fetchJobProfile=async()=>{
    

    try{
      const res=await axios.get("https://chawlacomponents.com/api/v1/jobProfile")
      //console.log("job profile",res.data.docs)
      setJobProfiles(res.data.docs)
      //console.log(jobProfiles.length)
  
      
      }
      catch(err){
        console.log(err)
      }
  }
 const handleJobProfile=async(itemValue)=>{
  
  setIsLoading(true)
  setSelectJobProfile(itemValue)

  

  try {
    const res=await axios.get(`https://chawlacomponents.com/api/v1/attendance/?jobProfileName=${itemValue}`)
   
    const parsedData = res?.data;
    //console.log("apidata",parsedData);
    const userData = parsedData.employees;
   console.log(userData);
    if (parsedData.success && parsedData.employees) {

    const mappedData = userData.map(item => {
      //console.log('item111234', item);
    
      // Extracting the time from the "punchIn" value
      const punchInTime = item.punches[0]?.punchIn
        ? new Date(item.punches[0].punchIn).toLocaleTimeString([],  { hour: '2-digit', minute: '2-digit', hour12: true })
        : 'N/A';
        const punchOutTime = item.punches[0]?.punchOut
        ? new Date(item.punches[0].punchOut).toLocaleTimeString([],  { hour: '2-digit', minute: '2-digit', hour12: true })
        : 'Null';
        const approvedByValue = item.punches[0]?.approvedBy?.name
        ? item.punches[0]?.approvedBy.name
        : item.punches[0]?.rejectedBy?.name
        ? item.punches[0].rejectedBy.name
        : 'Need Action';
    
      return {
        Date: new Date(item.date).toLocaleDateString('en-GB', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
        name: item.employeeId.name,
        punchIn: punchInTime, 
        PunchOut: punchOutTime,
        ApprovedBy: approvedByValue,
      };
    });
    

      setData(mappedData);
      //console.log("renderData",mappedData);// console the 
      setFilteredData(mappedData);
      setIsLoading(false);
      setIsLogin(true);
      alert('Attendance data fetched successfully');
      
    } else {
      console.log('Invalid data format:', parsedData);
      setIsLoading(false);
    }
  } catch (err) {
    console.log(`API Error: ${err}`);
    setIsLoading(false);
  }
     
 }
  
  const handleEmployeePunch=async(name)=>{
    if(showEmployeePuches){
      setShowEmployeePunches(false)
      setEmployeeData([])
    }
    else{
      setShowEmployeePunches(true)
    }
    

   
      setIsLoading(true);
    setEmployeePunch(name)
    console.log("Name",name)
    //console.log("\n")
    if(showEmployeePuches===false){
      try {
        
        
        const res = await axios.get(`https://chawlacomponents.com/api/v1/attendance?name=${name}`);
  
        const parsedData = res?.data;
        //console.log('apidata', parsedData);
        if (parsedData.success && parsedData.employees) {
          const userData = parsedData.employees[0].punches;

          console.log("data",userData.length)
         
          const mappedData = userData.map(item => {
           // console.log('item111234', item);
           const formatTime = time => {
            return item.punchIn
              ? new Date(item.punchIn).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })
              : 'N/A';
          };
          const punchInTime = item.punchIn
          ? new Date(item.punchIn).toLocaleTimeString([],  { hour: '2-digit', minute: '2-digit', hour12: true })
          : 'N/A';
          const punchOutTime = item?.punchOut
          ? new Date(item.punchOut).toLocaleTimeString([],  { hour: '2-digit', minute: '2-digit', hour12: true })
          : 'Null';
          const approvedByValue = item?.approvedBy?.name
          ? item?.approvedBy.name
          : item.rejectedBy?.name
          ? item.rejectedBy.name
          : 'Need Action';

  
            return {
              Date: new Date(parsedData.employees[0].date).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }),
              punchIn: punchInTime,
              PunchOut: punchOutTime,
              status: item.status,
              Type: 'Pending',
              ApprovedBy: approvedByValue,
              id:parsedData.employees[0].employeeId._id,
            originalPunchIn:item.punchIn,
            date:item.createdAt
            };
          });
          //updatedData=mappedData.shift()
          //console.log(updatedData.length)
          mappedData.splice(0, 1); // Remove the first object from the array

          //console.log(dataArray);

          console.log(mappedData)
  
          setEmployeeData(mappedData);
          //console.log('renderData', mappedData); // console the
          //setFilteredData(mappedData);
          setIsLoading(false);
          //setIsLogin(true);
          alert('Attendance data fetched successfully');
        } else {
          console.log('Invalid data format:', parsedData);
          setIsLoading(false);
        }
      } catch (err) {
        console.log('appi err in table', err);
        setIsLoading(false);
      }
    }
    else{
      console.log("hii")
      setEmployeeData([])
      setIsLoading(false)
    }
  }
  const fetchData = async () => {
    console.warn('click happened');
    setIsLoading(true);

    try {
      // const res = await axios.get('https://hrms-backend-04fw.onrender.com/api/v1/attendance/');
      
      const res = await axios.get(`${BASE_URL}/attendance/`);

      const parsedData = res?.data;
     console.log('apidata', parsedData);
      if (parsedData.success && parsedData.employees) {
        const userData = parsedData.employees;

        const mappedData = userData.map(item => {
          console.log('item111234', item);
          const formatTime = time => {
            return item.punches[0]?.punchIn
              ? new Date(item.punches[0].punchIn).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })
              : 'N/A';
          };

          // Extracting the time from the "punchIn" value
          // const punchInTime = item.punches[0]?.punchIn
          //   ? new Date(item.punches[0].punchIn).toLocaleTimeString([], {
          //       hour: '2-digit',
          //       minute: '2-digit',
          //       hour12: true,
          //     })
          //   : 'N/A';
          const punchInTime = item.punches[0]?.punchIn
          ? new Date(item.punches[0].punchIn).toLocaleTimeString([],  { hour: '2-digit', minute: '2-digit', hour12: true })
          : 'N/A';
          const punchOutTime = item.punches[0]?.punchOut
          ? new Date(item.punches[0].punchOut).toLocaleTimeString([],  { hour: '2-digit', minute: '2-digit', hour12: true })
          : 'Null';
          const approvedByValue = item.punches[0]?.approvedBy?.name
          ? item.punches[0]?.approvedBy.name
          : item.punches[0]?.rejectedBy?.name
          ? item.punches[0].rejectedBy.name
          : 'Need Action';

        

          return {
            Date: new Date(item.date).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }),
            name: item.employeeId.name,
            punchIn: punchInTime,
            PunchOut: punchOutTime,
            status: item.punches[0].status,
            Type: 'Pending',
            ApprovedBy: approvedByValue,
            id:item.employeeId._id,
            originalPunchIn:item.punches[0].punchIn,
           
          };
        });

        setData(mappedData);
        console.log('renderData', mappedData); // console the
        setFilteredData(mappedData);
        setIsLoading(false);
        setIsLogin(true);
        alert('Attendance data fetched successfully');
      } else {
        console.log('Invalid data format:', parsedData);
        setIsLoading(false);
      }
    } catch (err) {
      console.log('appi err in table', err);
      setIsLoading(false);
    }
  };
  const handleReject=(Id,punchIn,date)=>{
    console.log(Id,punchIn,date)
    setIsLoading(true)
    axios.patch("https://chawlacomponents.com/api/v1/attendance/updateAttendance",
    {
      "employeeId":Id,
    "status":"reject",
    "punchInTime":punchIn,
    "date":date
    }).then(res=>{
      setIsLoading(false)
      Alert.alert("Status Update Sucessfully")
      //setRefreshing(true)
      fetchData()

    }).catch((err)=>{
      setIsLoading(false)
      console.log(err)
      //Alert.alert(err)
    })
  }
  const handleApproved=(Id,punchIn,date)=>{
    console.log(Id,punchIn)
    setIsLoading(true)
    axios.patch("https://chawlacomponents.com/api/v1/attendance/updateAttendance",
    {
      "employeeId":Id,
    "status":"approved",
    "punchInTime":punchIn,
    "date":date
    }).then(res=>{
      setIsLoading(false)
      Alert.alert("Status Update Sucessfully")
      fetchData()

    }).catch((err)=>{
      setIsLoading(false)
      console.log(err)
    })
  }
  const handlePendingStatusClick = (Id,punchIn,date) => {
    Alert.alert(
      "Select Action",
      "Choose an action for the change status of employee",
      [
        {
          text: "Approved",
          onPress: () => handleApproved(Id,punchIn,date),
        },
        {
          text: "Reject",
          onPress: () =>handleReject(Id,punchIn,date),
        },
        { text: "Cancel", style: "cancel" },
      ]
    )
  };
  const handleApprovedStatusClick = (Id,punchIn,date) => {
    Alert.alert(
      "Select Action",
      "Choose an action for the change status of employee",
      [
        {
          text: "Reject",
          onPress: () =>handleReject(Id,punchIn,date),
        },
        { text: "Cancel", style: "cancel" },
      ]
    )
  };
  const handleRejectStatusClick = (Id,punchIn,date) => {
    Alert.alert(
      "Select Action",
      "Choose an action for the change status of employee",
      [
        
        {
          text: "Approved",
          onPress: () => handleApproved(Id,punchIn,date),
        },
        { text: "Cancel", style: "cancel" },
      ]
    )
  };

  const tableHeader = () => (
    <View style={styles.header}>
      <ScrollView horizontal={true}>
      {columns.map((column, index) => (
        <Text style={styles.text} key={index}>
          {column}
        </Text>
      ))}
      </ScrollView>
    </View>
  );
  if(isLoading){
    return(
      <LoadingScreen/>
    )
  }
  else if(profile==="Manager" || profile==="hr"){
  return (
    <View style={styles.container}>
      <Navbar />

      <View style={styles.container2}>
        <View style={{marginTop: 10}}>
          <Text style={{fontSize: 19, fontWeight: '700', color: 'black'}}>
            Attendance DataBase
          </Text>
        </View>
        <View style={{marginTop: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
          >
            {/* Picker */}
            <View style={styles.dropdown}>
              <Picker
                style={styles.picker}
                selectedValue={selectedOption}
                onValueChange={itemValue => setSelectedOption(itemValue)}
                itemStyle={{color: 'black'}} // Set text color for Picker items
              >
                <Picker.Item label="Select Type" value="Any" />
                <Picker.Item label="Your Attandance" value="Your Attandance" />
                <Picker.Item
                  label="Staff Attandance"
                  value="Staff Attandance"
                />
              </Picker>
              {/* Custom Arrow Icon */}
            </View>
            {/* //filter have to add datapicker*/}

            {/* Search bar */}
            <View style={styles.dropdown}>
              <Picker
                style={styles.picker}
                selectedValue={selectJobProfile}
                onValueChange={itemValue => handleJobProfile(itemValue)}
                itemStyle={{ color: 'black' }} // Set text color for Picker items
              >
                <Picker.Item label="Select Type" value="Any" />
                {jobProfiles.map((item, index) => (
                  //console.log(item)
                  <Picker.Item label={item.jobProfileName} value={item.jobProfileName} />
                  

                  ))}
                
                

              </Picker>
              {/* Custom Arrow Icon */}
              <View style={styles.arrowContainer}>
                {/* <Icon name="caret-down" size={25} color="black" /> */}
              </View>
            </View>

            <View style={styles.searchBarContainer}>
              <Icon name="search" style={styles.searchIcon} />
              <TextInput
                style={{...styles.searchInput, color: 'black'}}
                placeholder="Search"
                placeholderTextColor="#B0B0B0"
                onChangeText={text => {
                  setSearchText(text); 
                  handleSearch()
                 
                }}
                onSubmitEditing={handleSearch}
                value={searchText}
              />
            </View>
          </View>
        </View>
        {/* <ScrollView horizontal={true}> */}
        <View style={[styles.attendanceContainer]}>
          {selectedOption === 'Staff Attandance' ? (
              <ScrollView horizontal>
            <FlatList
              data={data}
              ListHeaderComponent={tableHeader}

             
              // horizontal={true}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                />
              }
              renderItem={({item, index}) => (
                //console.log('overwrite', item),
                (
                  <View>
                 
                  <View style={styles.tableRow}>
                    <Text style={styles.columnRowTxt}>{item.Date}</Text>
                    <TouchableOpacity  style={{flexDirection:"row",flex:1}}>
                      
                    <Text onPress={()=>handleEmployeePunch(item.name)} style={styles.columnRowTxt}>{item.name}</Text>
                    {showEmployeePuches&&employeePunch=== item.name ?<MaterialCommunityIcons  name="arrow-down" size={15} color="black" />:null}
                    
                    </TouchableOpacity>
                    
                    
                    <Text style={styles.columnRowTxt}>{item.punchIn}</Text>
                    <Text style={styles.columnRowTxt}>{item.PunchOut}</Text>
                    

                    {item.status === 'pending' && (
                      <View
                        style={{
                          flexDirection: 'row',
                          backgroundColor: '#FEF5ED',
                          borderRadius: 15,
                          padding: 6,
                        }}
                      >
                        <Feather
                          name="loader"
                          color={'#945D2D'}
                          size={15}
                          style={{marginRight: 4}}
                        />
                        <Text style={{fontSize: 12, color: '#945D2D'}}>
                          Pending
                        </Text>
                        <MaterialCommunityIcons
                name="dots-vertical" // Using the three-point menu icon
                color={'#945D2D'}
                size={15}
                style={{ marginRight: 4 }}
                onPress={()=>handlePendingStatusClick(item.id,item.originalPunchIn,item.Date)}
              />
                      </View>
                    )}
                    {item.status === 'approved' && (
                      <View
                        style={{
                          flexDirection: 'row',
                          backgroundColor: '#E9F7EF',
                          borderRadius: 15,
                          padding: 6,
                        }}
                      >
                        <Feather
                          name="check"
                          color={'#186A3B'}
                          size={15}
                          style={{marginRight: 4}}
                        />
                        <Text style={{fontSize: 12, color: '#186A3B'}}>
                          Approved
                        </Text>
                        <MaterialCommunityIcons
                name="dots-vertical" // Using the three-point menu icon
                color={'#186A3B'}
                size={15}
                style={{ marginRight: 4 }}
                onPress={()=>handleApprovedStatusClick(item.id,item.originalPunchIn,item.Date)}
              />
                      </View>
                    )}
                    {item.status === 'rejected' && (
                      <View
                        style={{
                          flexDirection: 'row',
                          backgroundColor: '#FCECEC',
                          borderRadius: 15,
                          padding: 6,
                        }}
                      >
                        <Feather
                          name="x"
                          color={'#8A2626'}
                          size={15}
                          style={{marginRight: 4}}
                        />
                        <Text style={{fontSize: 12, color: '#8A2626'}}>
                          Rejected
                        </Text>
                        <MaterialCommunityIcons
                name="dots-vertical" // Using the three-point menu icon
                color={'#8A2626'}
                size={15}
                style={{ marginRight: 4 }}
                onPress={()=>handleRejectStatusClick(item.id,item.originalPunchIn,item.Date)}
              />
                      </View>
                      
                      
                    
                    )}

                    <Text style={styles.columnRowTxt}>{item.ApprovedBy}</Text>
                    
                  </View>
                  {showEmployeePuches===true&&employeePunch=== item.name  && <FlatList    keyExtractor={(item, index) => index.toString()} style={{marginLeft:"10%"}} data={employeeData} renderItem={({item,index})=>(
                    
                    <View style={styles.tableRow}>
                    <Text style={styles.columnRowTxt}>|</Text>
                    <Text style={styles.columnRowTxt}>|</Text>
                     <Text style={styles.columnRowTxt}>{item.punchIn}</Text>
                    <Text style={styles.columnRowTxt}>{item.PunchOut}</Text>
                    

                    {item.status === 'pending' && (
                      <View
                        style={{
                          flexDirection: 'row',
                          backgroundColor: '#FEF5ED',
                          borderRadius: 15,
                          padding: 6,
                        }}
                      >
                        <Feather
                          name="loader"
                          color={'#945D2D'}
                          size={15}
                          style={{marginRight: 4}}
                        />
                        <Text style={{fontSize: 12, color: '#945D2D'}}>
                          Pending
                        </Text>
                        <MaterialCommunityIcons
                name="dots-vertical" // Using the three-point menu icon
                color={'#945D2D'}
                size={15}
                style={{ marginRight: 4 }}
                onPress={()=>handlePendingStatusClick(item.id,item.originalPunchIn,item.Date)}
              />
                      </View>
                    )}
                    {item.status === 'approved' && (
                      <View
                        style={{
                          flexDirection: 'row',
                          backgroundColor: '#E9F7EF',
                          borderRadius: 15,
                          padding: 6,
                        }}
                      >
                        <Feather
                          name="check"
                          color={'#186A3B'}
                          size={15}
                          style={{marginRight: 4}}
                        />
                        <Text style={{fontSize: 12, color: '#186A3B'}}>
                          Approved
                        </Text>
                        <MaterialCommunityIcons
                name="dots-vertical" // Using the three-point menu icon
                color={'#186A3B'}
                size={15}
                style={{ marginRight: 4 }}
                onPress={()=>handleApprovedStatusClick(item.id,item.originalPunchIn,item.Date)}
              />
                      </View>
                    )}
                    {item.status === 'rejected' && (
                      <View
                        style={{
                          flexDirection: 'row',
                          backgroundColor: '#FCECEC',
                          borderRadius: 15,
                          padding: 6,
                        }}
                      >
                        <Feather
                          name="x"
                          color={'#8A2626'}
                          size={15}
                          style={{marginRight: 4}}
                        />
                        <Text style={{fontSize: 12, color: '#8A2626'}}>
                          Rejected
                        </Text>
                        <MaterialCommunityIcons
                name="dots-vertical" // Using the three-point menu icon
                color={'#8A2626'}
                size={15}
                style={{ marginRight: 4 }}
                onPress={()=>handleRejectStatusClick(item.id,item.originalPunchIn,item.Date)}
              />
                      </View>
                      
                      
                    
                    )}
                   

                    <Text style={styles.columnRowTxt}>{item.ApprovedBy}</Text>
                    
                  </View>

                  )}/> 
                 }
                  </View>
                  
                  
                 
                
                  
                )
               
               
              )}
              
            />
             </ScrollView>
          ) : (
            <MyAttendance />
          )}
        </View>
        {/* </ScrollView> */}
      </View>
    </View>
  );
          }
  else{
    return(
    <View style={styles.container}>
      <Navbar />

      <View style={styles.container2}>
        <View style={{marginTop: 10}}>
          <Text style={{fontSize: 19, fontWeight: '700', color: 'black'}}>
            Attendance DataBase
          </Text>
        </View>
        <View style={{marginTop: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
          >
          
            

            <View style={styles.searchBarContainer}>
              <Icon name="search" style={styles.searchIcon} />
              <TextInput
                style={{...styles.searchInput, color: 'black'}}
                placeholder="Search"
                placeholderTextColor="#B0B0B0"
                onChangeText={text => {
                  setSearchText(text); // Update the searchText state variable on text change
                  handleSearch(); // Call the handleSearch function on text change
                }}
                onSubmitEditing={handleSearch}
                value={searchText}
              />
            </View>
          </View>
        </View>
        {/* <ScrollView horizontal={true}> */}
        <View style={[styles.attendanceContainer]}>
            <MyAttendance />
          
        </View>
        {/* </ScrollView> */}
      </View>
    </View>
    )
  }        
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop:16,
  },
  container2: {
    padding: 10,
  },
  iconView: {
    //  backgroundColor:'#945D2D',
    color: '#945D2D',
  },
  BtnStatus: {
    fontSize: 10,
  },

  text: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
    padding: 10,
    // paddingHorizontal:20, // Reduce the padding for better fitting in table cells
    textAlign: 'center', // Center the text within each cell
    fontFamily: 'Inter',
    fontWeight: 'bold',
  },
  Bodytext: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    padding: 6,
  },
  header: {
    backgroundColor: '#ECEDFE',
    paddingVertical: 15,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: 'space-evenly',
    alignItems: "center",
    borderTopEndRadius: 5,
    borderTopStartRadius: 2,
  },
  row: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  searchBarContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 5,
    marginBottom: 15,

    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
    // height:40,
    marginTop: 10,
    borderWidth: 1,

    // borderRadius: 10,
    borderColor: '#F0F0F0',
    elevation: 1,
    justifyContent: 'center',
  },

  filterBarContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 5,
    marginBottom: 15,

    flexDirection: 'row',
    alignItems: 'center',
    width: '28%',
    // height:40,
    marginTop: 10,
    borderWidth: 1,
    // elevation: 2,
    // borderRadius: 10,
    borderColor: '#F0F0F0',
    elevation: 1,
    justifyContent: 'center',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
    color: '#C8C8C8',
    marginLeft: 10,
  },
  filterIcon: {
    fontSize: 16,
    marginRight: 10,
    color: '#080808',
    marginLeft: 12,
  },
  searchInput: {
    fontSize: 16,
    height: 40,
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    height: 40,

    alignItems: 'center',
    width: '100%', // Set the row width to the screen width
    color: 'black',
  },
  nextedTableRow:{
    flexDirection: 'row',
    height: 40,
    margin:10,

    alignItems: 'center',
    width: '80%', // Set the row width to the screen width
    color: 'black',

  },
  dropdown: {
    backgroundColor: 'white',
    borderWidth: 0.1,
    borderRadius: 10,
    overflow: 'hidden',
    width: '30%', // Set the width to a small value to make the dropdown small
    // height: '50%',
    borderColor: '#F0F0F0',
    elevation: 1,
    marginLeft:10,
  marginRight:10,
    justifyContent: 'center',
  },
  picker: {
    height: '10%',
    width: '100%',
    color: '#000',
    // justifyContent:'center',
    // alignItems:'center'
    textAlign: 'center',
    // marginBottom:20
    // flex:1
  },
  columnRowTxt: {
    color: 'black',
    flex: 1, // Set each column to occupy an equal portion of the row
    textAlign: 'center',
    fontSize: 12,
    overflow: 'hidden',
  },
  attendanceContainer: {
    backgroundColor: '#fff',
    height: '90%',
    // width: '90%',
  },
  dateFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderColor: '#283093',
    borderWidth: 1,
    borderRadius: 10, // Adjust the border radius as needed
    paddingHorizontal: 10,
    paddingVertical: '1.5%',
    maxWidth: 200,
    marginLeft: '25%',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    // marginHorizontal: 10,
    color: '#283093',
  },
});

export default TableComp;
