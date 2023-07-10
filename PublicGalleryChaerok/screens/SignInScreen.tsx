import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './RootStack';
import SignForm from '../components/SignForm';
import SignButtons from '../components/SignButtons';
import { Sign, signIn, signUp } from '../lib/auth';
import { getUser } from '../lib/users';
import { useUserContext } from '../contexts/UserContext';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

export interface IsSignUp {
	isSignUp: boolean
}

export interface Form {
	email: string,
	password: string,
	confirmPassword: string,
}

interface ChangeTextHandler {
	(value: string): void
}

function SignInScreen({ navigation, route }: Props): JSX.Element {
	const { isSignUp }: IsSignUp = route.params ?? { isSignUp: false }

	const [ form, setForm ]: any = useState<Form>({
		email: '',
		password: '',
		confirmPassword: ''
	})
	const [ loading, setLoading ]: any = useState<boolean>(false)
	const { setUser }: any = useUserContext()

	const createChangeTextHandler = (name: string): ChangeTextHandler => (value: string): void => {
		setForm({ ...form, [name]: value})
	}

	const onSubmit = async (): Promise<void> => {
		Keyboard.dismiss()

		const { email, password, confirmPassword }: Form = form

		if (isSignUp && (email === '' || password === '' || confirmPassword === '')) {
			Alert.alert('아이디, 비밀번호를 입력해주세요.')

			return
		}
		
		if (isSignUp && password !== confirmPassword) {
			Alert.alert('실패', '비밀번호가 일치하지 않습니다.')
		}

		const info: Sign = { email, password }

		if (!isSignUp && (info.email === '' || info.password === '')) {
			Alert.alert('아이디, 비밀번호를 입력해주세요.')

			return
		}

		setLoading(true)


		try {
			const { user }: any = isSignUp ? await signUp(info) : await signIn(info)
			const profile: any = await getUser(user.uid)

			if (!profile.displayName) {
				navigation.navigate('Welcome', { uid: user.uid })
			} else {
				setUser(profile)
			}
		} catch (e: any) {
			const messages: any= {
				'auth/email-already-in-use': '이미 가입된 이메일입니다.',
				'auth/wrong-password': '잘못된 비밀번호입니다.',
				'auth/user-not-found': '존재하지 않는 계정입니다.',
				'auth/invalid-email': '유효하지 않은 이메일 주소입니다.'
			}
			console.log(e)
			const msg: string = messages[e.code] || `${ isSignUp ? '가입' : '로그인' } 실패`
			Alert.alert('실패', msg)
		} finally {
			setLoading(false)
		}
	}


	return (
		<KeyboardAvoidingView style={ styles.container }>
			<SafeAreaView style={ styles.wrapper }>
				<Text style={ styles.text }>Public Gallery</Text>
				<View style={ styles.form }>
					<SignForm isSignUp={ isSignUp } onSubmit={ onSubmit } form={ form } createChangeTextHandler={ createChangeTextHandler } />
					<SignButtons isSignUp={ isSignUp } onSubmit={ onSubmit } loading={ loading }/>
				</View>
			</SafeAreaView>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text :{
        fontSize: 32,
        fontWeight: 'bold'
    },
    form: {
        width: '100%',

		marginTop: 64,
		paddingHorizontal: 16
    }
})

export default SignInScreen
