import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

type BottomTabParamsList = {
	Home: undefined,
	Search: undefined,
	Notification: undefined,
	Message: undefined
}

const Tab = createMaterialBottomTabNavigator<BottomTabParamsList>()

function OpenDetailButton(): JSX.Element {
	const navigation: any = useNavigation()

	return (
		<Button title='Detail 1 열기' onPress={(): void => navigation.push('Detail', { id : 1 })} />
	)
}

function HomeScreen() {
	useFocusEffect(
		useCallback(() => {
		console.log('이 화면을 보고 있어요.')

		return () => {
			console.log('다른 화면으로 넘어갔어요')
		}
	}, [])
	)
	
	return (
		<View>
			<Text>Home</Text>
			<OpenDetailButton />
			{/* <Button  title='Detail 1 열기' onPress={ (): void => navigation.push('Detail', { id: 1 })} /> */}
		</View>
	)
}

function SearchScreen() {
	return <Text>Search</Text>
}

function NotificationScreen() {
	return <Text>Notification</Text>
}

function MessageScreen() {
	return <Text>Message</Text>
}

function MainScreen(): JSX.Element {

	return (
		<Tab.Navigator initialRouteName='Home' shifting={ true } barStyle={{ backgroundColor: 'white' }}>
			<Tab.Screen name='Home' component={ HomeScreen } options={{
				tabBarLabel: '홈', tabBarIcon: ({ color }) => <Icon name='home' color={ color } size={ 24 } />, 
				tabBarColor: 'red', tabBarBadge: 'new'
			}} />
			<Tab.Screen name='Search' component={ SearchScreen } options={{
				tabBarLabel: '검색', tabBarIcon: ({ color }) => <Icon name='search' color={ color } size={ 24 } />, 
				tabBarColor: 'gray'
			}} />
			<Tab.Screen name='Notification' component={ NotificationScreen } options={{
				tabBarLabel: '알림', tabBarIcon: ({ color }) => <Icon name='notifications' color={ color } size={ 24 } />, 
				tabBarColor: 'green', tabBarBadge: 30
			}} />
			<Tab.Screen name='Message' component={ MessageScreen } options={{
				tabBarLabel: '메시지', tabBarIcon: ({ color }) => <Icon name='message' color={ color } size={ 24 }/>, 
				tabBarColor: 'blue', tabBarBadge: true
			}} />
		</Tab.Navigator>
	)
}

export default MainScreen
