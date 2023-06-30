import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface Props {
    date: Date
}

interface Top {
    top: number
}

function DateHead({ date }: Props): JSX.Element {
    const year: number = date.getFullYear()
    const month: number = date.getMonth() + 1
    const day: number = date.getDate()

    const { top }: Top = useSafeAreaInsets()

	return (
        <View>
            <View style={ [styles.statusBarPlaceholder, { height: top }] } />
            <StatusBar backgroundColor="red" />
            <View style={ styles.block }>
                <Text style={ styles.dateText }>
                    { year }년 { month }월 { day }일
                </Text>
            </View>
        </View>
	)
}

const styles = StyleSheet.create({
    block: {
        padding: 16,
        backgroundColor: '#26a69a'
    },
    dateText: {
        fontSize: 24,
        color: 'white'
    },
    statusBarPlaceholder: {
        backgroundColor: '#26a69a'
    }
})

export default DateHead
