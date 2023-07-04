import React, { useContext, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WriteHeader from '../components/WriteHeader';
import WriteEditor from '../components/WriteEditor';
import { useNavigation } from '@react-navigation/native';
import LogContext from '../contexts/LogContext';
import { RootStackParamList } from './RootStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Write'>;

function WriteScreen({ route }: Props): JSX.Element {
	const log: any = route.params?.log
	const navigation: any = useNavigation()

	const [ title, setTitle ]: any = useState<string>(log?.title ?? '')
	const [ body, setBody ]: any = useState<string>(log?.body ?? '')
	const [ date, setDate ]: any = useState<Date>(log ? new Date(log.date) : new Date())


	const { onCreate, onModify, onRemove }: any = useContext(LogContext)

	const onSave: any = (): void => {
		if (log) {
			onModify({
				id: log.id,
				date: date.toISOString(),
				title, 
				body
			})
		} else {
			onCreate({
				title, body, date: date.toISOString()
			})
		}

		navigation.pop()
	}

	const onAskRemove: any = (): void => {
		Alert.alert('삭제', '정말로 삭제하시겠어요?', [{ 
			text: '취소', style: 'cancel' 
			}, {
			text: '삭제',
			onPress: (): void => {
				onRemove(log?.id)
				navigation.pop()
			}, style: 'destructive' 
			}], {
				cancelable: true
		})
	}

	return (
		<SafeAreaView style={ styles.container }>
			<KeyboardAvoidingView style={ styles.avoidingView } behavior={ Platform.OS === 'ios' ? 'padding' : undefined }>
				<WriteHeader onSave={ onSave } onAskRemove={ onAskRemove } isEditing={ !!log } date={ date } onChangeDate={ setDate }/>
				<WriteEditor title={ title } body={ body } onChangeTitle={ setTitle } onChangeBody={ setBody } />
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	avoidingView: {
		flex: 1
	}
})

export default WriteScreen


