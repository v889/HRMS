import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button
} from 'react-native';
import React, {useEffect, useState}  from 'react';
import Feather from 'react-native-vector-icons/Feather';
import axios  from 'axios';



const CardArray = () => {
  const [pendingEmployees, setPendingEmployees] = useState([]);
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://hrms-backend-04fw.onrender.com/api/v1/attendance/');
      const data = response.data;
      const pendingEmployees = data.employees.filter(employee => {
        return employee.punches[0].status === 'pending'
      });
      console.log("pending11111",pendingEmployees);
      setPendingEmployees(pendingEmployees);
    } catch (error) {
      console.error('errA',error);
    }
  };
  const handleAction = async (employeeId, status, punchIn) => {
    try {
      console.log('timmme'+punchIn);
      const requestData = {
        employeeId: employeeId,
        status: status, // usin' the provided status
        punchInTime:punchIn
      };
      console.log('patch data',requestData);
      const response = await axios.patch('https://hrms-backend-04fw.onrender.com/api/v1/attendance/updateAttendance', requestData);
      console.log(response.data);
     // Update the pendingEmployees state by removing the approved/rejected employee --> by checking it prev one 
     setPendingEmployees(prevEmployees => prevEmployees.filter(employee => employee.employeeId._id !== employeeId));
    } 
    catch (error) {
      console.error(error);
    }
  };
  
 
  
  return (
    <View style={styles.container}>
      {pendingEmployees.map(employee => 
      
      (
       
        console.log("cardData",employee),
        <View key={employee.employeeId._id} style={styles.card}>
        
        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
          <Image source={{ uri: 'https://avatars.githubusercontent.com/u/94738352?v=4' }} style={styles.photo} />
          <View style={{flexDirection:'column', paddingLeft:10}}>
          <Text style={styles.name}>{employee.employeeId.name}</Text>
          <Text style={styles.punchIn}>Punch In: {new Date(employee.punches[0].punchIn).toLocaleTimeString()}</Text>
          {/* <Text >Employee ID: {employee.employeeId._id}</Text>  */}
          </View>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-evenly', margin:25}}>
          {/* <Button title="Approve" onPress={() => handleApprove(employee)} /> */}
          {/* <Button title="Deny" onPress={() => handleDeny(employee)} /> */}
          
                <TouchableOpacity
                   style={styles.Ftext}
                   onPress={() => handleAction(employee.employeeId._id, 'approved', employee.punches[0].punchIn)}
                 >
                   <View style={{flexDirection: 'row', alignItems: 'center'}}>
                     <Feather name="check" color={'#FBFBFC'} />
                     <Text style={{marginLeft: 4, color: '#FBFBFC'}}>
                       Approve
                     </Text>
                   </View>
                 </TouchableOpacity>

                 <TouchableOpacity
                   style={styles.Ftext}
                   onPress={() => handleAction(employee.employeeId._id, 'rejected',employee.punches[0].punchIn)}
                 >
                   <View style={{flexDirection: 'row', alignItems: 'center'}}>
                     <Feather name="x" color={'#FBFBFC'} />
                     <Text style={{marginLeft: 4, color: '#FBFBFC'}}>Deny</Text>
                   </View>
                 </TouchableOpacity>
               </View>
          {/* // </View> */}
        </View>
      ))}
    </View>
  );
};
export default CardArray;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#F0F0F0',
    elevation:2,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0.3},
    shadowOpacity: 0.2,
    shadowRadius: 0.7,
    flexDirection:'column'
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
   
  },
  punchIn: {
  
    fontSize: 12,
     fontWeight: '600',
  },
  Ftext: {
        borderRadius: 5,
        
        borderColor: '#283093',
        width: 120,
        height: 43,
        fontSize: 12,
        backgroundColor: '#283093',
        paddingHorizontal: 12,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        // borderRadius: 4,
      },
  
});
