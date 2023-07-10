import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyProfileScreen from './MyProfileScreen';
import PostScreen from './PostScreen';
import { Post } from '../lib/posts';

export type MyProfileStackParamList = {
    MyProfile: undefined,
    Post: {
        post: Post
    }
}

const Stack = createNativeStackNavigator<MyProfileStackParamList>()

function MyProfileStack(): JSX.Element {
    return (
        <Stack.Navigator>
            <Stack.Screen  name='MyProfile' component={ MyProfileScreen } />
            <Stack.Screen  name='Post' component={ PostScreen } options={{ title: '게시물' }} />
        </Stack.Navigator>
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

export default MyProfileStack
