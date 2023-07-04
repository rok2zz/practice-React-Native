import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import RootStack from './screens/RootStack'

function App(): JSX.Element {
	return (
		<NavigationContainer>
			<RootStack />
		</NavigationContainer>
	)
}

export default App