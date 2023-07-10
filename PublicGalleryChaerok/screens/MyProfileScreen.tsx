import React, { useEffect } from 'react';
import { useUserContext } from '../contexts/UserContext';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Profile from '../components/Profile';
import IconRightButton from '../components/IconRightButton';

function MyProfileScreen(): JSX.Element {
    const { user }: any = useUserContext()
    const navigation: any = useNavigation()

    useEffect((): void => {
        navigation.setOptions({
            title: user.displayName,
            headerRight: (): JSX.Element => (
                <IconRightButton name='settings' onPress={(): void => navigation.push('Setting') } />
            )
        })
    }, [ navigation, user ])

    return (
        <Profile userId={ user.id } />
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 24
    }
})

export default MyProfileScreen
