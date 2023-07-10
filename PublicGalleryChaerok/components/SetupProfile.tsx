import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { ActivityIndicator, Image, Platform, Pressable, StyleSheet, View } from 'react-native';
import BorderedInput from './BorderedInput';
import CustomButton from './CustomButton';
import { User, createUser } from '../lib/users';
import { signOut } from '../lib/auth';
import { useUserContext } from '../contexts/UserContext';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage'
import Avatar from './Avatar';


function SetupProfile(): JSX.Element {
	const navigation = useNavigation()
	const [ displayName, setDisplayName ] = useState('')
	const { setUser }: any = useUserContext()
	const [ response, setResponse ]: any = useState(null) 
	const [ loading, setLoading ]: any = useState(false)
	
	const { params } = useRoute()
	const { uid } = params || {} as any

	const onSubmit = async (): Promise<void> => {
		setLoading(true)

		let photoURL = null

		if (response) {
			const asset = response.assets[0]
			const extension = asset.fileName.split('.').pop() // 확장자 추출
			const reference = storage().ref(`/profile/${ uid }.${ extension }`)

			if (Platform.OS === 'android') {
				await reference.putString(asset.base64, 'base64', {
					contentType: asset.type
				})
			} else {
				await reference.putFile(asset.url)
			}

			photoURL = response ? await reference.getDownloadURL() : null
		}

		const user: User = {
			id: uid,
			displayName,
			photoURL
		}

		createUser(user)
		setUser(user)
	}

	const onCancel = (): void => {
		signOut()
		navigation.goBack()
	}

	const onSelectImage = (): void => {
		launchImageLibrary(
			{
				mediaType: 'photo',
				maxWidth: 512,
				maxHeight: 512,
				includeBase64: Platform.OS === 'android'
			},
			(res: any) => {
				if (res.didCancel) {
					return
				}

				setResponse(res)
			}
		)
	}


	return (
		<View style={ styles.container }>
			<Pressable onPress={ onSelectImage } > 
				<Avatar source={ response && { uri: response.uri }} size={ 128 } style={ '' } />

			</Pressable>
			<View style={ styles.form }>
				<BorderedInput placeholder='닉네임' value={ displayName } onChangeText={ setDisplayName } 
					onSubmitEditing={ onSubmit } returnKeyType='next' />
				
				{ loading ? (
					<ActivityIndicator size={ 32 } color='#6200ee' style={ styles.spinner } />
				) : (
					<View style={ styles.buttons }>
						<CustomButton title='다음' onPress={ onSubmit } hasMarginBottom />
						<CustomButton title='취소' onPress={ onCancel } theme='secondary' />
					</View>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create ({
	container: {
		width: '100%',

		alignItems: 'center',

		paddingHorizontal: 16,
		marginTop: 24
	},
	form: {
		width: '100%',

		marginTop: 16
	},
	spinner: {

	},
	buttons: {
		marginTop: 48
	}
})
export default SetupProfile
