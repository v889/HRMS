import React, {useContext, useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import Feather from 'react-native-vector-icons/Feather';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const {isLoading, isLogin, login, logout} = useContext(AuthContext);
  console.log('login',login);
  const handleLogin = () => {
    login(email, password);
    navigation.navigate('SplashScreen');
  };

  const handleLogout = () => {
    logout();
    alert('logout successfully');
    navigation.navigate('Header');
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {isLogin ? (
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        ) : (
          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Inter',
                fontWeight: '700',
                paddingVertical: 30,
                fontSize: 25,
              }}
            >
              Employee Login
            </Text>
            <View style={{paddingBottom: 15}}>
              <Text style={styles.labelTxt}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                placeholder="Enter Email"
                onChangeText={text => setEmail(text)}
              />
            </View>
            <View style={{paddingBottom: 15}}>
              <Text style={styles.labelTxt}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                placeholder="Enter password"
                onChangeText={text => setPassword(text)}
                secureTextEntry
              />

              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <View style={{flexDirection: 'row'}}>
                  <Feather name="log-in" size={18} color={'white'} />
                  <Text style={styles.buttonText}>Login</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={styles.labelTxt}>Don't have an account?</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={{color: 'white', alignItems:'center'}}>ForgotPassword</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '90%',
  },
  labelTxt: {
    color: 'black',
    fontWeight: '400',
    fontFamily: 'Inter',
    paddingBottom: 10,
    marginRight: 12,
    paddingTop: 12,
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  button: {
    backgroundColor: '#283093',
    // padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // width:102,
    height:45,
    // padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '30%',
    paddingHorizontal:5,
    paddingVertical:3

    // height: '20%',
  },
  buttonText: {
    color: 'white',
    paddingLeft: 10,
    // textAlign: 'center',
  },
  link: {
    backgroundColor: '#283093',
    color: 'white',
    padding: 10,
    borderRadius: 10,
  },
});

export default LoginScreen;
