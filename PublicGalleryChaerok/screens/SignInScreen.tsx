import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Stack = createNativeStackNavigator()

function SignInScreen(): JSX.Element {
    return (
        <SafeAreaView style={ styles.container }>
            <Text style={ styles.text }>Public Gallery</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,

        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 32,
        fontWeight: 'bold'
    }
})

export default SignInScreen