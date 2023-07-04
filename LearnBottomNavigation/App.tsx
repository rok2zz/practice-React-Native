// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React from 'react';
import MainScreen from './screens/MainScreen';
import DetailScreen from './screens/DetailScreen';

export type StackParamList = {
	Main: undefined,
	Detail: {
		id: number
	}
}

const Stack = createNativeStackNavigator<StackParamList>()

function getHeaderTitle(route: any) {
	const routeName: string = getFocusedRouteNameFromRoute(route) ?? 'Home'
	const nameMap: any = {
		Home: '홈',
		Search: '검색',
		Notification: '알림',
		Message: '메시지'
	}

	return nameMap[routeName]
}

function App(): JSX.Element {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name='Main' component={ MainScreen } options={({ route }) => ({ title: getHeaderTitle(route) })} />
				<Stack.Screen name='Detail' component={ DetailScreen } />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

// type BottomTabParamsList = {
// 	Home: undefined,
// 	Search: undefined,
// 	Notification: undefined,
// 	Message: undefined
// }

// const Tab = createBottomTabNavigator<BottomTabParamsList>()


// function HomeScreen() {
// 	return <Text>Home</Text>
// }

// function SearchScreen() {
// 	return <Text>Search</Text>
// }

// function NotificationScreen() {
// 	return <Text>Notification</Text>
// }

// function MessageScreen() {
// 	return <Text>Message</Text>
// }

// function App(): JSX.Element {

// 	return (
// 		<NavigationContainer>
// 			<Tab.Navigator initialRouteName='Home' screenOptions={
// 					{
// 						"tabBarActiveTintColor": "#fb8c00",
// 					}
// 				}>
// 				<Tab.Screen name='Home' component={ HomeScreen } options={{
// 					title: '홈', tabBarIcon: ({ color, size }) => (<Icon name='home' color={ color } size={ size }/>)
// 				}} />
// 				<Tab.Screen name='Search' component={ SearchScreen } options={{
// 					title: '검색', tabBarIcon: ({ color, size }) => (<Icon name='search' color={ color } size={ size }/>)
// 				}} />
// 				<Tab.Screen name='Notification' component={ NotificationScreen } options={{
// 					title: '알림', tabBarIcon: ({ color, size }) => (<Icon name='notifications' color={ color } size={ size }/>)
// 				}} />
// 				<Tab.Screen name='Message' component={ MessageScreen } options={{
// 					title: '메시지', tabBarIcon: ({ color, size }) => (<Icon name='message' color={ color } size={ size }/>)
// 				}} />
// 			</Tab.Navigator>
// 		</NavigationContainer>
// 	)
// }

export default App
