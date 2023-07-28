// import { StyleSheet, Text, View } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ConfirmedComponent = () => {
//   const [approvedData, setApprovedData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://hrms-backend-04fw.onrender.com/api/v1/attendance/getattendancebydate');
//         const data = response.data;

//         if (data.success) {
//           const approvedEmployees = data.employees.filter(employee =>
//             employee.attendance.some(att => att.status === 'approved')
//           );

//           const approvedPunches = approvedEmployees.flatMap(employee =>
//             employee.attendance
//               .filter(att => att.status === 'approved')
//               .flatMap(att => att.punches)
//           );

//           const formattedData = approvedPunches.map(punch => ({
//             name: punch.employeeId.name,
//             date: new Date(punch.date).toDateString(),
//             punchInTime: new Date(punch.punchIn).toLocaleTimeString(),
//             punchOutTime: new Date(punch.punchOut).toLocaleTimeString(),
//             message: 'Your message goes here',
//           }));

//           setApprovedData(formattedData);
//         } else {
//           console.log('API error:', data.message);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {approvedData.map((data, index) => (
//         <View key={index} style={styles.card}>
//           <Text style={styles.name}>{data.name}</Text>
//           <Text style={styles.date}>{data.date}</Text>
//           <Text style={styles.time}>
//             {data.punchInTime} - {data.punchOutTime}
//           </Text>
//           <Text style={styles.message}>{data.message}</Text>
//         </View>
//       ))}
//     </View>
//   );
// };

// export default ConfirmedComponent;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   card: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 16,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   date: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   time: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   message: {
//     fontSize: 14,
//   },
// });

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ConfirmedComponent = () => {
  return (
    <View>
      <Text>ConfirmedComponent</Text>
    </View>
  )
}

export default ConfirmedComponent

const styles = StyleSheet.create({})