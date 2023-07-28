// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React from 'react';
// import {Button} from 'react-native-elements';
// // const [selection, setSelection] = useState('pending');


// const ApproveLeave = () => {




//   // const handlePending =() =>{

//   // }
//   return (
//     <View>
//       <Text
//         style={{
//           fontSize: 21,
//           fontWeight: 'bold',
//           color: '#000000',
//           margin: 20,
//         }}
//       >
//         Approve Leaves and Gatepass
//       </Text>
//       <View style={styles.but}>
//       <TouchableOpacity  style={styles.button}onPress={()=>console.log('clicked')}>
//                     <Text style={styles.txt}>Pending</Text>
//        </TouchableOpacity>
//        <TouchableOpacity style={styles.button} onPress={()=>console.log('clicked')}>
//                     <Text style={styles.txt}>Confirmed</Text>
//        </TouchableOpacity>
//        <TouchableOpacity style={styles.button} onPress={()=>console.log('clicked')}>
//                     <Text style={styles.txt}>Rejected</Text>
//        </TouchableOpacity>
       
        
//       </View>
//       {/* <TouchableOpacity onPress={} */}
//        {/* Render the card list based on the selection */}
 
//     </View>
//   );
// };

// export default ApproveLeave;

// const styles = StyleSheet.create({
//   but: {
//     flexDirection: 'row',
//     marginLeft: 20,
//     marginTop: 20,
//     justifyContent:'flex-start',

//   },
//   button: {
//     marginRight:1 , // Adjust the spacing between buttons manually
//     borderWidth:0.3,
//     padding:10,
//     borderRadius:4,
//     paddingHorizontal:14,
//     shadowColor: '#000',
//     // shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.2,
//     shadowRadius: 0.3,
//     elevation: 1,
    
    
//     backgroundColor: '#F0F0F0', //#F0F0F0

//   },

//   txt:{
//     color:'black',
//     fontWeight:'500',
//     fontSize:11

//   }
// });
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PendingComponent from './PendingComponent';
import ConfirmedComponent from './ConfirmedComponent';
import RejectedComponent from './RejectedComponent';

const ApproveLeave = () => {
  const [selection, setSelection] = useState('');

  const handlePendingPress = () => {
    setSelection('pending');
  };

  const handleConfirmedPress = () => {
    setSelection('confirmed');
  };
  const handleRejectedPress = () => {
    setSelection('rejected');
  };

  return (
    <View>
      <Text style={styles.title}>Approve Leaves and Gatepass</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selection === 'pending' && styles.activeButton,
          ]}
          onPress={handlePendingPress}
        >
          <Text style={styles.buttonText}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selection === 'confirmed' && styles.activeButton,
          ]}
          onPress={handleConfirmedPress}
        >
          <Text style={styles.buttonText}>Confirmed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selection === 'rejected' && styles.activeButton,
          ]}
          onPress={handleRejectedPress}
        >
          <Text style={styles.buttonText}>Rejected</Text>
        </TouchableOpacity>
      </View>

      {selection === 'pending' && <PendingComponent />}
      {selection === 'confirmed' && <ConfirmedComponent />}
      {selection === 'rejected' && <RejectedComponent />}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#000000',
    margin: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 20,
    justifyContent: 'flex-start',
  },
  button: {
    flex: 1,
    // marginRight: 2,
    // marginLeft:2,
    borderWidth: 0,
    borderColor: '#CCCCCC',
    padding: 10,
    borderRadius: 1,
    // paddingHorizontal: 14,
    shadowOpacity: 0.2,
    shadowRadius: 0.3,
    elevation: 1,
    backgroundColor: '#F0F0F0',
    justifyContent:'center',
    alignItems:'center'
  },
  activeButton: {
    backgroundColor: '#E6E6FA',
  },
  buttonText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 11,
  },
});

export default ApproveLeave;
