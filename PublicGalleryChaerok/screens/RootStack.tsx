import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import SignInScreen from './SignInScreen';
import WelcomeScreen from './WelcomeScreen';
import { useUserContext } from '../contexts/UserContext';
import MainTab from './MainTab';
import { subscribeAuth } from '../lib/auth';
import { getUser } from '../lib/users';
import UploadScreen from './UploadScreen';
import ModifyScreen from './ModifyScreen';
import SettingScreen from './SettingScreen';
import SplashScreen from 'react-native-splash-screen';

export type RootStackParamList = {
    MainTab: undefined,
    Upload: {
        res: any
    },
    Modify: undefined,
    Setting: undefined,
    SignIn: {
        isSignUp: boolean
    },
    Welcome: {
        uid: string
    },
}

interface CurrentUser {
    uid: string
}

const Stack = createNativeStackNavigator<RootStackParamList>()

function RootStack(): JSX.Element {
    const { user, setUser }: any = useUserContext()

    useEffect(() => {
        const unsubscribe = subscribeAuth(async (currentUser: CurrentUser): Promise<void> => {
            unsubscribe()

            if (!currentUser) {
                SplashScreen.hide()
                return
            }

            const profile = await getUser(currentUser.uid)

            setUser(profile)
        })
    }, [ setUser ])

    return (
        <Stack.Navigator>
            { user.displayName ? (
                <>
                    <Stack.Screen name='MainTab' component={ MainTab } options={{ headerShown: false }} />
                    <Stack.Screen name='Upload' component={ UploadScreen } 
                        options={{ title: '새 게시물', headerBackTitle: '뒤로가기'}} />
                    <Stack.Screen name='Modify' component={ ModifyScreen } 
                        options={{ title: '설명 수정', headerBackTitle: '뒤로가기'}} />
                    <Stack.Screen name='Setting' component={ SettingScreen } 
                        options={{ title: '설정', headerBackTitle: '뒤로가기'}} />
                </>
            ) : (
                <>
                    <Stack.Screen name='SignIn' component={ SignInScreen } options={{ headerShown: false }} />
                    <Stack.Screen name='Welcome' component={ WelcomeScreen } options={{ headerShown: false }} />
                </>
            )}
        </Stack.Navigator>
    )
}


export default RootStack
