import {Picker} from '@react-native-picker/picker';
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Navbar from '../Navbar';
import {AuthContext} from '../../context/AuthContext';
import Feather from 'react-native-vector-icons/Feather';

const LeaveApplication = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedFromDate, setSelectedFromDate] = useState('');
  const [selectedToDate, setSelectedToDate] = useState('');
  const [reason, setReason] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state variable
  const {userInfo} = useContext(AuthContext);
  const {employee} = userInfo;
  const currentDateTime = new Date();
  const year = currentDateTime.getFullYear();
  const month = String(currentDateTime.getMonth() + 1).padStart(2, '0');
  const date = String(currentDateTime.getDate()).padStart(2, '0');
  const currentTime = currentDateTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedDateTime = `${year}-${month}-${date}`;
  const handleApply = () => {
    // Create an object with the data
    const applicationData = {
      employeeId: employee._id,
      from: selectedFromDate,
      to: selectedToDate,
      gatePassTime: currentTime,
      gatePassDate: formattedDateTime,
      message: reason,
    };

    // Log the data
    console.log('Application Data:', applicationData);

    // Start the loading state
    setIsLoading(true);

    // Make the API call
    fetch('https://hrms-backend-04fw.onrender.com/api/v1/leave', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(applicationData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Display success message
          alert('Applied successfully');
          // Resetting the form
          setSelectedOption(null);
          setSelectedFromDate('');
          setSelectedToDate('');
          setReason('');
        } else {
          // Display error message
          alert('Error:', data.message);
        }
      })
      .catch(error => {
        alert('Error:', error);
      })
      .finally(() => {
        // Stop the loading state
        setIsLoading(false);
      });
  };

  const showFromDatePicker = () => {
    setDatePickerVisibility('fromDate');
  };

  const showToDatePicker = () => {
    setDatePickerVisibility('toDate');
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    const dt = new Date(date);
    dt.setDate(dt.getDate()); // Increment the date by 1 day
    const day = String(dt.getDate()).padStart(2, '0');
    const month = String(dt.getMonth() + 1).padStart(2, '0');
    const year = dt.getFullYear();
    const formattedDate = year + '-' + month + '-' + day;

    if (isDatePickerVisible === 'fromDate') {
      setSelectedFromDate(formattedDate);
    } else if (isDatePickerVisible === 'toDate') {
      setSelectedToDate(formattedDate);
    }

    alert(formattedDate);
    hideDatePicker();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Navbar />
      <View
        style={{
          marginTop: 12,
          justifyContent: 'center',
          alignItems: 'flex-start',
          marginLeft: 17,
        }}
      >
        <Text
          style={{
            fontFamily: 'Inter',
            fontSize: 18,
            fontWeight: '700',
            color: 'black',
          }}
        >
          Apply for a Leave/Gatepass
        </Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Application Type:</Text>
          <View style={styles.dropdown}>
            <Picker
              style={styles.picker}
              selectedValue={selectedOption}
              onValueChange={itemValue => setSelectedOption(itemValue)}
            >
              <Picker.Item label="Choose:" value="Any" />
              <Picker.Item label="Leave" value="leave" />
              <Picker.Item label="Gatepass" value="gatepass" />
            </Picker>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>From Date:</Text>
          <View>
            {/* <Button title="Select From Date" onPress={showFromDatePicker} /> */}
            <TouchableOpacity style={styles.button} onPress={showFromDatePicker}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                // color: '#FBFBFC',
                color:'black',
                fontSize: 15,
                fontWeight: '300',
                marginRight: 10,
              }}
            >
             Select From Date
            </Text>
            <Feather size={15} color={'#283093'} name="calendar" />
          </View>
        </TouchableOpacity>
            <DateTimePicker
              isVisible={isDatePickerVisible === 'fromDate'}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          {selectedFromDate !== '' && (
            <Text style={styles.selectedDate}>
              From Date: {selectedFromDate}
            </Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>To Date:</Text>
          <View>
            <TouchableOpacity style={styles.button} onPress={showToDatePicker}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                // color: '#FBFBFC',
                color:'black',
                fontSize: 15,
                fontWeight: '300',
                marginRight: 10,
              }}
            >
             Select To Date
            </Text>
            <Feather size={17} color={'#283093'} name="calendar" />
          </View>
        </TouchableOpacity>
            <DateTimePicker
              isVisible={isDatePickerVisible === 'toDate'}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          {selectedToDate !== '' && (
            <Text style={styles.selectedDate}>To Date: {selectedToDate}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Reason:</Text>
          <TextInput
            style={styles.reasonInput}
            multiline
            maxLength={250}
            value={reason}
            onChangeText={setReason}
          />
        </View>

        <TouchableOpacity style={styles.Ftext} onPress={handleApply}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: '#FBFBFC',
                fontSize: 16,
                fontWeight: '500',
                marginRight: 2,
              }}
            >
              Apply
            </Text>
            <Feather size={17} color={'#FAFAFA'} name="chevrons-up" />
          </View>
        </TouchableOpacity>

        {/* Display activity loader if loading state is true */}
        {isLoading && <ActivityIndicator size="large" color="#007AFF" />}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  formContainer: {
    flex: 1,
  },
  formGroup: {
    margin: 20,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    padding: 5,
  },
  picker: {
    height: 40,
    width: '100%',
  },
  selectedDate: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  reasonInput: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
    height: 100,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontWeight: '400',
    marginBottom: 5,
    fontSize: 12,
    color: 'black',
  },
  button: {
    // backgroundColor: '#283093',
    color: 'black',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth:1
    // alignSelf: 'flex-end',
  },
  Ftext: {
    width: 104,
    height: 40,
    color: '#283093',
    fontSize: 16,
    fontWeight: '500',
    backgroundColor: '#283093',
    paddingHorizontal: 20,
    // paddingVertical: 15,
    borderRadius: 7,
    // marginRight:24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 30,
  },
});

export default LeaveApplication;
