import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import RootStack from './screens/RootStack';
import { LogContextProvider } from './contexts/LogContext';
import { SearchContextProvider } from './contexts/SearchContext';

function App(): JSX.Element {

	return (
		<NavigationContainer>
			<SearchContextProvider>
				<LogContextProvider>
					<RootStack />
				</LogContextProvider>
			</SearchContextProvider>
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({

})

export default App
