import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import moment from 'moment';

const PendingComponent = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [gatepassData, setGatepassData] = useState([]);


  useEffect(() => {
    fetchLeaveData();
    fetchGatepassData();
  }, []);

  const fetchLeaveData = async () => {
    try {
      const response = await axios.get(
        'https://hrms-backend-04fw.onrender.com/api/v1/leave/pending'
      );
      setLeaveData(response.data.pendingLeaveWithFilteredPeriods);
      console.log(setLeaveData)
      
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGatepassData = async () => {
    try {
      const response = await axios.get(
        'https://hrms-backend-04fw.onrender.com/api/v1/leave/pendinggatepass'
      );
      setGatepassData(response.data.pendingGatePassWithFilteredPeriods);
    } catch (error) {
      console.error(error);
    }
  };

  //approve and deny function 
  const handleApprove = async(employeeId, from, to, message) => {
    try{
        const data = {
            employeeId:  employeeId,
            from:from,
            to:  to,
            status: 'approved',
            rejectedReason: message
        };
         console.log(data);
        // Send PATCH request with the data
         const response= await axios.patch('https://hrms-backend-04fw.onrender.com/api/v1/leave/approveleave', data)
          
            //success response'
              // Remove the approved leave request from the leaveData state
            const updatedLeaveData = leaveData.filter(
            (leaveRequest) => leaveRequest.employeeId._id !== employeeId
            );
            setLeaveData(updatedLeaveData);
            console.log('Approval successful:', response.data);
          

    }catch(error) {
        // Handle the error if needed
        console.error('Error approving:', error);
      };
  };
  
  const handleDeny = (employeeId, from, to, rejectedReason) => {
    const data = {
        employeeId:  employeeId,
            from:from,
            to:  to,
            status: 'denied',
            rejectedReason: rejectedReason
      
    };
  
    // Send PATCH request with the data
    axios.patch('https://hrms-backend-04fw.onrender.com/api/v1/leave/approveleave', data)
      .then((response) => {
        // Handle the response if needed
        console.log('Denial successful:', response.data);
      })
      .catch((error) => {
        // Handle the error if needed
        console.error('Error denying:', error);
      });
  };


//   console.log('gatepassData:', gatepassData);
  
  return (
    <View>
      {leaveData.map((leaveRequest) => {
        const gatepass = gatepassData.find(
          (item) => item.employeeId._id === leaveRequest.employeeId._id
        );
                                                                                               
        return (
          <View key={leaveRequest._id} style={styles.card}>
            <Text style={styles.cardTitle}>{leaveRequest.employeeId.name}</Text>
            {gatepass ? (
              <>
                <Text style={styles.cardSubtitle}>
                  Gatepass Time: {gatepass.gatePass[0].time}
                </Text>
                <Text style={styles.cardText}>
                  Gatepass Date: {moment(gatepass.date).format('YYYY-MM-DD')}
                </Text>
              </>
            ) : (
                //separate call?
                
              <Text style={styles.cardText}>No Gatepass Data Available</Text>
            )}
            <Text style={styles.cardText}>
              Leave Date: {moment(leaveRequest.fromTo[0].from).format('YYYY-MM-DD')} -{' '}
              {moment(leaveRequest.fromTo[0].to).format('YYYY-MM-DD')}
            </Text>
            <Text style={styles.cardText}>
            Message: {leaveRequest.fromTo[0].message}
          </Text>
            <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonApprove}
              onPress={() =>
                handleApprove(
                  leaveRequest.employeeId._id,
                  leaveRequest.fromTo[0].from,
                  leaveRequest.fromTo[0].to,
                  leaveRequest.fromTo[0].message,
                )
              }
            >
                <Text style={styles.buttonText}>Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity
              style={styles.buttonDeny}
              onPress={() =>
                handleDeny(
                  leaveRequest.employeeId._id,
                  leaveRequest.fromTo[0].from,
                  leaveRequest.fromTo[0].to,
                  leaveRequest.fromTo[0].message,
                
                )
              }
            >
                <Text style={styles.buttonText}>Deny</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
  
} 

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: 'black',
  },
  cardText: {
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonApprove: {
    backgroundColor: '#00FF00',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    marginLeft: 10,
  },
  buttonDeny: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PendingComponent;
