import React from 'react';
import { Button, Text, View } from 'react-native';
import { StackParamList } from '../App';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';

export type DetailScreenProps = StackScreenProps<StackParamList, "Headerless">

function HeaderlessScreen({ navigation, route }: DetailScreenProps): JSX.Element {
	return (
		<SafeAreaView>
			<View>
				<Text>헤더가 없어요</Text>
				<Button title='뒤로가기' onPress={(): void => navigation.pop()} />
			</View>
		</SafeAreaView>
	)
}

export default HeaderlessScreen
