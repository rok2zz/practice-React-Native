import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedScreen from './FeedScreen';
import ProfileScreen from './ProfileScreen';
import { Post } from '../lib/posts';
import PostScreen from './PostScreen';

export type HomeStackParamList = {
    Feed: undefined,
    Post: {
        post: Post
    },
    Profile: {
        userId: string,
        displayName: string
    }
}

const Stack = createNativeStackNavigator<HomeStackParamList>()

function HomeStack(): JSX.Element {
    return (
        <Stack.Navigator>
            <Stack.Screen  name='Feed' component={ FeedScreen } />
            <Stack.Screen  name='Profile' component={ ProfileScreen } />
            <Stack.Screen  name='Post' component={ PostScreen } options={{ title: '게시물' }} />
        </Stack.Navigator>
    )
}

export default HomeStack
