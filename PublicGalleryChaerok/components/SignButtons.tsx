import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import CustomButton from './CustomButton';
import { useNavigation } from '@react-navigation/native';

interface Props {
	isSignUp: boolean,
	onSubmit(): void,
	loading: boolean
}

function SignButtons({ isSignUp, onSubmit, loading }: Props): JSX.Element {
	const navigation: any = useNavigation()

	const primaryTitle: string = isSignUp ? '회원가입' : '로그인'
	const secondaryTitle: string  = isSignUp ? '로그인' : '회원가입'

	const onSecondaryButtonPress = (): void => {
		if (isSignUp) {
			navigation.push('SignIn', { isSignUp: false })
		} else {
			navigation.push('SignIn', { isSignUp: true })
		}
	}

	if (loading) {
		return (
			<View style={ styles.spinnerWrapper }>
				<ActivityIndicator size={ 32 } color='#6200ee' />
			</View>
		)
	}

	return (
		<View style={ styles.buttons }>
			<CustomButton title={ primaryTitle } hasMarginBottom onPress={ onSubmit } />
			<CustomButton title={ secondaryTitle } theme='secondary' onPress={ onSecondaryButtonPress }/>
		</View>
	)
}

const styles = StyleSheet.create({
	spinnerWrapper: {
		height: 104,

		alignItems: 'center',
		justifyContent: 'center',

		marginTop: 64
	},
	buttons: {
		marginTop: 64
	}
})

export default SignButtons
