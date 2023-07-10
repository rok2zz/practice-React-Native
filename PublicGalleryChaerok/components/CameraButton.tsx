import { useState } from "react"
import { Platform, Pressable, StyleSheet, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Icon from "react-native-vector-icons/MaterialIcons"
import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import { useNavigation } from "@react-navigation/native"
import ActionSheetModal from "./ActionSheetModal"


const TABBAR_HEIGHT = 49

interface ImagePickerOption {
    mediaType: any,
    maxWidth: number,
    maxHeight: number,
    includeBase64: boolean
}

const imagePickerOption: ImagePickerOption = {
    mediaType: 'photo',
    maxWidth: 768,
    maxHeight: 768,
    includeBase64: Platform.OS === 'android'
}

function CameraButton(): JSX.Element {
    const insets = useSafeAreaInsets()
    const navigation: any = useNavigation()
    const [ modalVisible, setModalVisible ]: any = useState<boolean>(false)

    const bottom = Platform.select({
        android: TABBAR_HEIGHT / 2,
        ios: TABBAR_HEIGHT / 2 + insets.bottom - 4
    })

    const onPickImage = (res: any): void => {
        if (res.didCancel || !res) {
            return
        }

        navigation.push('Upload', { res })
    }

    const onLaunchCamera = (): void => {
        launchCamera(imagePickerOption, onPickImage)
    }

    const onLaunchImageLibrary = (): void => {
        launchImageLibrary(imagePickerOption, onPickImage)
    }

    return ( 
        <>
            <View style={[ styles.container, { bottom } ]}>
                <Pressable style={ styles.circle } android_ripple={{ color: '#ffffff' }}
                    onPress={(): void => setModalVisible(true)}>
                    <Icon name='camera-alt' color='white' size={ 24 } />
                </Pressable>
            </View>
            <ActionSheetModal visible={ modalVisible } onClose={(): void => setModalVisible(false)} 
                actions={[
                    {
                        icon: 'camera-alt',
                        text: '카메라로 촬영하기',
                        onPress: onLaunchCamera
                    },
                    {
                        icon: 'photo',
                        text: '사진 선택하기',
                        onPress: onLaunchImageLibrary
                    }
            ]} />
        </>
    )
}

const styles = StyleSheet.create ({
    container: {
        width: 54,
        height: 54,

        borderRadius: 27,

        position: 'absolute',
        left: '50%',
        zIndex: 5,
        
        transform: [
            { 
                translateX: -27 
            }
        ],
        ...Platform.select({
            ios: {
                shadowColor: '#4d4d4d',
                shadowOffset: { width: 0, height: 4},
                shadowOpacity: 0.3,
                shadowRadius: 4
            },
            android: {
                elevation: 5,
                overflow: 'hidden'
            }
        })
    },
    circle: {
        width: 54,
        height: 54,

        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 27,

        backgroundColor: '#6200ee'
    }
})

export default CameraButton