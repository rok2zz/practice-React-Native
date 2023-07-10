import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import RootStack from './screens/RootStack';
import { UserContextProvider } from './contexts/UserContext';

function App(): JSX.Element {

	return (
		<UserContextProvider>
			<NavigationContainer>
				<RootStack />
			</NavigationContainer>
		</UserContextProvider>
	)
}

const styles = StyleSheet.create({

})

export default App
