import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text } from 'react-native';
import SetupProfile from '../components/SetupProfile';

function WelcomeScreen(): JSX.Element {

    return (
        <KeyboardAvoidingView style={ styles.container } behavior={Platform.select({ ios: 'padding' })}>
            <SafeAreaView style={ styles.safeContainer }>
                <Text style={ styles.title }>환영합니다!</Text>
                <Text style={ styles.description }>프로필을 설정하세요.</Text>
                <SetupProfile />
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1
    },
    safeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 48
    },
    description: {
        marginTop: 16,

        fontSize: 21,
        
        color: '#757575'
    }
})

export default WelcomeScreen
