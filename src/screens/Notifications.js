import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Navbar from './Navbar';
import { AuthContext } from '../context/AuthContext';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const { isLogin } = useContext(AuthContext);

  useEffect(() => {
    // Fetch notifications from the API
    if (isLogin) {
      fetch('https://hrms-backend-04fw.onrender.com/api/v1/notifications')
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setNotifications(data.notifications);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isLogin]);

  const renderNotification = ({ item }) => {
    let iconName;
    let iconColor;

    switch (item.notificationType) {
      case 'Alert':
        iconName = 'exclamation-circle';
        iconColor = 'red';
        break;
      case 'Info':
        iconName = 'info-circle';
        iconColor = 'blue';
        break;
      case 'High alert':
        iconName = 'warning';
        iconColor = '#8A2626';
        break;
      default:
        iconName = 'bell';
        iconColor = '#283093';
        break;
    }

    return (
      <TouchableOpacity style={styles.notificationContainer}>
        <View style={styles.iconContainer}>
          <Icon name={iconName} size={24} color={iconColor} />
        </View>
        <View style={styles.notificationDetails}>
          <Text style={styles.notificationMessage}>{item.message}</Text>
          <Text style={styles.notificationTime}>{formatTime(item.createdAt)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      <Navbar />
      {isLogin ? (
        <>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Notifications</Text>
          </View>
          <View style={styles.contentContainer}>
            <FlatList
              data={notifications}
              keyExtractor={(item) => item._id}
              renderItem={renderNotification}
            />
          </View>
        </>
      ) : (
        alert('Login First')
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
    marginRight:220
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  iconContainer: {
    marginRight: 12,
  },
  notificationDetails: {
    flex: 1,
  },
  notificationMessage: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: 'black',
  },
  notificationTime: {
    fontSize: 12,
    color: '#888',
  },
});


export default NotificationsScreen;
