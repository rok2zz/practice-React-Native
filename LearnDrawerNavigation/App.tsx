import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Button, Text, View } from 'react-native';

type DrawerParamList = {
	Home: undefined,
	Setting: undefined
}

const Drawer = createDrawerNavigator<DrawerParamList>()

function HomeScreen({ navigation }: any) {
	return (
		<View>
			<Text>Home</Text>
			<Button title='Drawer 열기' onPress={() => navigation.openDrawer()} />
			<Button title='Setting 열기' onPress={() => navigation.navigate('Setting')} />
		</View>
	)
}

function SettingScreen({ navigation }: any) {
	return (
		<View>
			<Text>Home</Text>
			<Button title='뒤로가기' onPress={() => navigation.goBack()} />
		</View>
	)
}

function App() {

	return (
		<NavigationContainer>
			<Drawer.Navigator initialRouteName='Home' backBehavior='history' screenOptions={{ drawerPosition: 'left' }}> 
				<Drawer.Screen name='Home' component={ HomeScreen } />
				<Drawer.Screen name='Setting' component={ SettingScreen } />
			</Drawer.Navigator>
		</NavigationContainer>
	)
}
export default App
