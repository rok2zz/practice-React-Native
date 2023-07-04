import React from 'react'
import { StyleSheet } from 'react-native'
import { Calendar, DateData } from 'react-native-calendars'

function CalendarView({ markedDates, selectedDate, onSelectedDate }: any): JSX.Element {
    const markedSelectedDate: any = {
        ...markedDates,
        [selectedDate]: {
            selected: true,
            marked: markedDates[selectedDate]?.marked
        }
    }

    return (
        <Calendar style={ styles.calendar } markedDates={ markedSelectedDate } 
            onDayPress={(day: DateData): void => {
                onSelectedDate(day.dateString)
            }}
            theme={{
                selectedDayBackgroundColor: '#009688',
                arrowColor: '#009688',
                dotColor: '#009688',
                todayTextColor: '#009688'
        }} />
    )
}

const styles = StyleSheet.create({
    calendar: {
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0'
    }
})

export default CalendarView