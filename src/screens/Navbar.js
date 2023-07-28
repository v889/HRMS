import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Navbar = () => {
  return (
    <View style={styles.header}>
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
    </View>
  </View>
  )
}

export default Navbar

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
})