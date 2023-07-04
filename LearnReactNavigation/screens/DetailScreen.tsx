import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StackParamList } from '../App';
import { StackScreenProps } from '@react-navigation/stack';

export type DetailScreenProps = StackScreenProps<StackParamList, "Detail">

function DetailScreen({ navigation, route }: DetailScreenProps): JSX.Element {
	useEffect((): void => {
		navigation.setOptions({ title: '상세정보 ' + route.params.id })
	}, [ navigation, route.params.id ])

	return (
		<View style={ styles.container }>
			<Text style={ styles.text }>{ route.name }: { route.params.id }</Text>
			<View style={ styles.buttonContainer }>
				<Button title='다음' onPress={(): void => navigation.push('Detail', { id: route.params.id + 1 }) } />
				<Button title='뒤로가기' onPress={(): void => navigation.pop() } />
				<Button title='처음으로' onPress={(): void => navigation.popToTop() } />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		fontSize: 48
	},
	buttonContainer: {
		flexDirection: 'row'
	}
})

export default DetailScreen
