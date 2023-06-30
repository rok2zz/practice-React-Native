/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react'
import type { PropsWithChildren } from 'react'
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from 'react-native'

import {
	Colors,
	DebugInstructions,
	Header,
	LearnMoreLinks,
	ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'
import Profile from './components/Profile'
import Counter from './components/Counter'

function App() {
	const isDarkMode = useColorScheme() === 'light'

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	}
	
	const [ count, setCount ] = useState<number>(0)

	function increaseCount(): void  {
		setCount(count + 1)
	}

	function decreaseCount(): void   {
		setCount(count - 1)
	}

	return (
		

		<ScrollView style={ styles.container }>
			<View style={backgroundStyle}>
				<StatusBar
					barStyle={isDarkMode ? 'light-content' : 'dark-content'}
					backgroundColor={backgroundStyle.backgroundColor}
				/>
			</View>
 			
			<Profile name={'chaerok'} isActive={ isActivated() } image={'https://picsum.photos/200'}>
				<Text>Hello World</Text>
			</Profile>

			<Counter count={ count } increaseCount={ increaseCount } decreaseCount={ decreaseCount } />

		</ScrollView>
	)
}

function isActivated(): boolean {
	return a
}

const object = {
	a: true,
	b: false,
	d: 3
}

const { a, b, d } = object

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})

export default App
