import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import FeedsScreen from './FeedsScreen';
import CalenderScreen from './CalenderScreen';
import SearchScreen from './SearchScreen';
import { RootStackParamList } from './RootStack';
import Icon from 'react-native-vector-icons/MaterialIcons'
import SearchHeader from '../components/SearchHeader';

const Tab = createBottomTabNavigator<RootStackParamList>()

function MainTab(): JSX.Element {

	return (
		<Tab.Navigator screenOptions={{ tabBarActiveTintColor: '#009688', tabBarShowLabel: false }}>
			<Tab.Screen name='Feeds' component={ FeedsScreen } options={{ tabBarIcon: ({ color, size }) => 
				(<Icon name='view-stream' color={ color } size={ size } />) }} 
			/>
			<Tab.Screen name='Calender' component={ CalenderScreen } options={{ tabBarIcon: ({ color, size }) => 
				(<Icon name='event' color={ color } size={ size } />) }}
			/>
			<Tab.Screen name='Search' component={ SearchScreen } options={{ headerTitle: (): JSX.Element => <SearchHeader /> , tabBarIcon: ({ color, size }) => 
				(<Icon name='search' color={ color } size={ size } />) }} 
			/>
		</Tab.Navigator>
	)
}

export default MainTab
