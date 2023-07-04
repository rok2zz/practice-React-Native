import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import HomeScreen from './screens/HomeScreen'
import DetailScreen from './screens/DetailScreen'
import HeaderlessScreen from './screens/HeaderlessScreen'

export type StackParamList = {
	Headerless: undefined,
	Home: undefined,
	Detail: {
		id: number
	}
}

const Stack = createNativeStackNavigator<StackParamList>()

function App(): JSX.Element {
	
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Headerless" component={ HeaderlessScreen } options={{ headerShown: false}} />
				<Stack.Screen name="Home" component={ HomeScreen } 
					options={{
						headerStyle: {
							backgroundColor: '#29b6f6'
						},
						headerTintColor: '#ffffff',
						headerTitleStyle: {
							fontSize: 20,
							fontWeight: 'bold'
						}
					}}  
				/>
				<Stack.Screen name="Detail" component={ DetailScreen } 
					options={{
						headerBackVisible: false,
						headerLeft: ({ onPress }: any) => (
							<TouchableOpacity onPress={ onPress }>
								<Text>Left</Text>
							</TouchableOpacity>
						),
						headerTitle: ({ children }) => (
							<View>
								<Text>{ children }</Text>
							</View>
						),
						headerRight: () => (
							<View>
								<Text>Right</Text>
							</View>
						)
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({

})

export default App
