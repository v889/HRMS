
import { StyleSheet } from 'react-native';
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../ConfigLinks';
 
export const AuthContext = createContext();
 
const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLogout, setIsLogout] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      await axios.post(`${BASE_URL}/auth/admin/login`, { email, password });
      setIsLogin(true);
      alert('Login successful');
      await myProfile();
      setIsLoading(false)
      setError(false)
    } catch (err) {
      console.log(`Login Error: ${err}`);
      alert('Login failed');
      setIsLogin(false);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };
 
  const myProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/myprofile`);
      const user = res.data;
      setUserInfo(user);
      console.log(user)
      AsyncStorage.setItem('userInfo', JSON.stringify(user));
    } catch (err) {
      console.log(`Profile Error: ${err}`);
    }
  };
 
  const logout = async () => {
    setIsLoading(true);
    try {
      await axios.get(`${BASE_URL}/logout`);
      AsyncStorage.removeItem('userInfo');
      setUserInfo({});
      setIsLogout(true)
      setIsLogin(false);
    } catch (err) {
      console.log(`Logout Error: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };
 
  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);
      const userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'));
      if (userInfo) {
        setUserInfo(userInfo);
        alert(userInfo);
      }
    } catch (error) {
      console.log(`IsLoggedIn Error: ${error}`);
    } finally {
      setSplashLoading(false);
    }
  };
 
  const mapAttendanceData = (user) => {
    return user.docs.map((item) => ({
      id: item._id,
      employeeId: item.employeeId,
      attendance: item.attendance,
      createdAt: item.createdAt,
      isPresent: item.isPresent,
      updatedAt: item.updatedAt,
    }));
  };
 
  const fetchDataAttendance = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/attendance`);
      const user = res?.data;
      const parsedData = user;
      if (parsedData.success && parsedData.docs) {
        setData(mapAttendanceData(parsedData));
        setIsLogin(true);
        alert('Attendance successful');
      } else {
        console.log('Invalid data format:', parsedData);
      }
    } catch (err) {
      console.log(`API Error: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };
 
  useEffect(() => {
    isLoggedIn();
  }, []);
 
  return (
    <AuthContext.Provider
      value={{ isLoading, isLogin, userInfo, login, logout, data, isLogout,fetchDataAttendance }}
    >
      {children}
    </AuthContext.Provider>
  );
};
 
export default AuthProvider;
 
const styles = StyleSheet.create({});