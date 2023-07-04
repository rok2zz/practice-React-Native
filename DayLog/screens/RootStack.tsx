import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import MainTab from './MainTab';
import WriteScreen from './WriteScreen';
import { Logs } from '../contexts/LogContext';

export type RootStackParamList = {
	Feeds: undefined,
	Calender: undefined,
	Search: undefined,
	MainTab: undefined,
	Write: {
		log: Logs
	}
}

const Stack = createNativeStackNavigator<RootStackParamList>()

function RootStack(): JSX.Element {

	return (
		<Stack.Navigator>
			<Stack.Screen name='MainTab' component={ MainTab } options={{ headerShown: false}} />
			<Stack.Screen name='Write' component={ WriteScreen } options={{ headerShown: false}} />
		</Stack.Navigator>
	)
}

const styles = StyleSheet.create({
	container: {

	}
})

export default RootStack
