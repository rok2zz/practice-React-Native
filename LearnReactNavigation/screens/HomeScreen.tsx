import React, { useEffect } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { Button, View } from 'react-native'
import { StackParamList } from '../App'

export type HomeScreenProps = StackScreenProps<StackParamList, "Home">

function HomeScreen({ navigation }: HomeScreenProps ): JSX.Element {
	useEffect((): void => {
		navigation.setOptions({ title: '홈' })
	}, [navigation])

	return (
		<View>
			<Button title='Detail 1 열기' onPress={ (): void =>  navigation.push('Detail', { id: 1 }) } />
			<Button title='Detail 2 열기' onPress={ (): void =>  navigation.push('Detail', { id: 2 }) } />
			<Button title='Detail 3 열기' onPress={ (): void =>  navigation.push('Detail', { id: 3 }) } />
			<Button title='Headerless 열기' onPress={ (): void =>  navigation.push('Headerless') } />
		</View>
	)
}

export default HomeScreen
