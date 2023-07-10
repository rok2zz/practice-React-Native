import { useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TextInput, View, useWindowDimensions } from "react-native";
import IconRightButton from "../components/IconRightButton";
import { useUserContext } from "../contexts/UserContext";
import { v4 } from 'uuid'
import { createPost } from "../lib/posts";
import storage from '@react-native-firebase/storage'
import events from "../lib/events";

function UploadScreen(): JSX.Element {
    const route = useRoute()
    const navigation: any = useNavigation()
    const { user }: any = useUserContext()
    const { res } = route.params || {} as any
    const { width } = useWindowDimensions() // 화면의 가로 크기
    const animation: any = useRef(new Animated.Value(width)).current
    const [ isKeyboardOpen, setIsKeyboardOpen ]: any = useState<boolean>(false)
    const [ description, setDescription ]: any = useState<string>('')

    const onSubmit = useCallback(async (): Promise<void> => {
        navigation.pop()

        const asset = res.assets[0]
        const extension = asset.fileName.split('.').pop()
        const reference = storage().ref(`/photo/${ user.id }/${ v4() }.${ extension }`)

        if (Platform.OS === 'android') {
            await reference.putString(asset.base64, 'base64', {
                contentType: asset.type
            })
        } else {
            await reference.putFile(asset.url)
        }

        const photoURL = await reference.getDownloadURL()
        await createPost({ user, photoURL, description })

        events.emit('refresh')
    }, [ res, user, description, navigation ])

    useEffect(() => {
        const didShow = Keyboard.addListener('keyboardDidShow', (): void => setIsKeyboardOpen(true))
        const didHide = Keyboard.addListener('keyboardDidHide', (): void => setIsKeyboardOpen(false))

        return () => {
            didShow.remove()
            didHide.remove()
        }
    }, [])

    useEffect((): void => {
        Animated.timing(animation, {
            toValue: isKeyboardOpen ? 0 : width,
            useNativeDriver: false,
            duration: 150,
            delay: 100
        }).start()
    }, [ isKeyboardOpen, width, animation ])

    useEffect((): void => {
        navigation.setOptions({
            headerRight: (): JSX.Element => <IconRightButton onPress={ onSubmit } name='send' />
        })
    }, [ navigation, onSubmit])

    return (
        <KeyboardAvoidingView style={ styles.container } behavior={ Platform.select({ ios: 'height' })}
            keyboardVerticalOffset={ Platform.select({
                ios: 180
            })}> 
            <Animated.Image source={{ uri: res.assets[0]?.uri }} style={[ styles.image, { height: animation }]} resizeMode='cover' />
            <TextInput style={ styles.input } multiline= { true } placeholder="이 사진에 대한 설명을 입력하세요."
                textAlignVertical="top" value={ description } onChangeText={ setDescription } />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1
    },
    image: {
        width: '100%'
    },
    input: {
        flex: 1,

        fontSize: 16,

        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 16
    }
})

export default UploadScreen