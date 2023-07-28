import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';

const CalendarScreen = () => {
  const today = new Date().toISOString().split('T')[0];
  const calendarTheme = {
    textMonthFontWeight: 'bold',
    textMonthFontSize: 20,
    monthTextColor: '#283093',
    arrowColor: 'black',
  };

  return (
    <View style={styles.container}>
      <Calendar
        current={new Date()}
        markingType={'custom'}
        markedDates={{
          [today]: {
            customStyles: {

              
              container: {
                backgroundColor: '#8A2626',
                elevation: 1,
              
              },
              text: {
                color: '#FAFAFA',
              },
            },
          },
        }}
        theme={calendarTheme}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   padding:2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    borderRadius: 9,
    elevation: 3,
    backgroundColor: '#F8F8F8',

  },
});

export default CalendarScreen;
