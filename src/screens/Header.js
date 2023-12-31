import React, { useContext } from 'react';
import { View, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Home from './HomeScreen';
import { Text } from 'react-native';
const Header = ({navigation}) => {
  const {login,isLogin}=useContext(AuthContext)
  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        {isLogin ? (
  <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
    <Text>Logout</Text>
  </TouchableOpacity>
) : (
  <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
    <Text>Login</Text>
  </TouchableOpacity>
)}
      </View>
      <Home navigation={navigation}/>
    </View>
  );
};
/*
Button
          title="Login"
          onPress={() => navigation.navigate('LoginScreen')}
          titleStyle={styles.button}*/   

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  logo: {
    height: 20,
  },
  header: {
    marginTop: 5,
  }
});