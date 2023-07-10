import React, { useEffect } from "react"
import Profile from '../components/Profile'
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { HomeStackParamList } from "./HomeStack"

interface Props {
    userId: string,
    displayName: string
}

function ProfileScreen(): JSX.Element {
    const route = useRoute<RouteProp<HomeStackParamList, "Profile">>()
    const navigation = useNavigation()
    const { userId, displayName }: Props = route.params ?? {} as Props

    useEffect((): void => {
        navigation.setOptions({ title: displayName + '님의 프로필' })
    }, [ navigation, displayName ])

    return (
        <Profile userId={ userId } />
    )
}

export default ProfileScreen