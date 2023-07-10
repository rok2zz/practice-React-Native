import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import BorderedInput from '../components/BorderedInput';

import { Form } from '../screens/SignInScreen';

interface Props {
	isSignUp: boolean,
	onSubmit(): void,
	form: Form,
	createChangeTextHandler: ChangeTextHandler
}

interface ChangeTextHandler {
	(value: string): void
}

function SignInScreen({ isSignUp, onSubmit, form, createChangeTextHandler }: Props): JSX.Element {
	const passwordRef: any = useRef()
	const confirmPasswordRef: any = useRef()

	return (
		<>
			<BorderedInput placeholder='이메일' hasMarginBottom value={ form.email } onChangeText={ createChangeTextHandler('email') }
				autoCapitalize='none' autoCorrec={ false } autoCompleteType='email' keyboardType='email-address' 
				returnKeyType='next' onSubmitEditing={ (): void => passwordRef.current.focus() }
			/>
			<BorderedInput placeholder='비밀번호' hasMarginBottom={ isSignUp } 
				value={ form.password } onChangeText={ createChangeTextHandler('password') } secureTextEntry ref={ passwordRef }
				returnKeyType={ isSignUp ? 'next' : 'done' } onSubmitEditing={ (): void => {
					if (isSignUp) {
						confirmPasswordRef.current.focus()
					} else {
						onSubmit()
					}
				}}
			/>
			{ isSignUp && <BorderedInput placeholder='비밀번호 확인' hasMarginBottom={ false } 
				value={ form.confirmPassword } onChangeText={ createChangeTextHandler('confirmPassword') } secureTextEntry />
			}
		</>
	)
}

const styles = StyleSheet.create({
})

export default SignInScreen
