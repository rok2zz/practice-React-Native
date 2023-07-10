import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import useUser from '../hooks/useUser';
import useAuthActions from '../hooks/useAuthActions';

function AuthStatus(): JSX.Element {
	const user = useUser()

	return (
		<View style={ styles.status }>
			<Text style={ styles.text }>
				{ user ? user.displayName : '로그인 하세요' }
			</Text>
		</View>
	)
}

function AuthButtons(): JSX.Element {
	const { authorize, logout } = useAuthActions()

	const onPressLogin = (): void => {
		authorize({
			id: 1,
			username: 'johndoe',
			displayName: 'John Doe'
		})
	}

	const onPressLogout = (): void => {
		logout()
	}
	
	return (
		<View>
			<Button title='로그인' onPress={ onPressLogin } />
			<Button title='로그아웃' onPress={ onPressLogout } />
		</View>
	)
}


function AuthApp(): JSX.Element {

	return (
		<SafeAreaView style={ styles.container }>
			<AuthStatus />
			<AuthButtons />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	status: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		fontSize: 20
	}
})

export default AuthApp
