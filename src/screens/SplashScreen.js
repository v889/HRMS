// import React, { useContext } from 'react';
// import { ActivityIndicator, View } from 'react-native';
// import { AuthContext } from '../context/AuthContext';
// import Header from './Header';
// import { Image } from 'react-native';

// const SplashScreen = ({navigation}) => {
//   const { isLoading } = useContext(AuthContext);

//   return (
//     isLoading ? (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems:'center' }}>
//         <Image style={{ width:"50%",height:"30%"}} source={require('../../assets/aus.png')}/>
//         <ActivityIndicator  size="large" color="black" />
//       </View>
//     ) : (
//       navigation.navigate('Header')
//     )
//   );
// };

// export default SplashScreen;
import React, { useContext } from 'react';
import { ActivityIndicator, View, StyleSheet, Dimensions } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Header from './Header';
import { Image } from 'react-native';
import LoginScreen from './Login';

const SplashScreen = ({ navigation }) => {
  const { isLoading ,isLogin} = useContext(AuthContext);

  return (
    isLoading ? (
      <View style={styles.container}>
        <View style={styles.centeredContent}>
          <Image style={styles.image} source={require('../../assets/aus.png')} />
          <ActivityIndicator size="large" color="black" />
        </View>
      </View>
    ) : (
     isLogin?navigation.navigate('Header'):<LoginScreen/>
    )
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  image: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.2,
  },
});

export default SplashScreen;
