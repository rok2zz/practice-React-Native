import { useNavigation, useRoute } from "@react-navigation/native"
import { useCallback, useEffect, useState } from "react"
import { KeyboardAvoidingView, Platform, StyleSheet, TextInput } from "react-native"
import IconRightButton from "../components/IconRightButton"
import { updatePost } from "../lib/posts"
import events from "../lib/events"

function ModifyScreen(): JSX.Element {
    const navigation: any = useNavigation()
    const { params }: any = useRoute()
    const [ description, setDescription ] = useState<string>(params.description)

    const onSubmit = useCallback(async (): Promise<void> => {
        await updatePost({
            id: params.id,
            description
        })

        events.emit('updatePost', {
            postId: params.id,
            description
        })

        navigation.pop()
    }, [ navigation, params.id, description ])

    useEffect((): void => {
        navigation.setOptions({
            headerRight: (): JSX.Element => <IconRightButton onPress={ onSubmit } name='check' /> 
        })
    }, [ navigation, onSubmit ])

    return (
        <KeyboardAvoidingView style={ styles.container } behavior={ Platform.select({ ios: 'height' })}
            keyboardVerticalOffset={ Platform.select({ ios: 88 })}>
            <TextInput style={ styles.input } multiline={ true } placeholder='이 사진에 대한 설명을 입력하세요.'
                textAlignVertical='top' value={ description } onChangeText={ setDescription } />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1
    },
    input: {
        flex: 1,

        fontSize: 16,

        paddingHorizontal: 16,
        paddingVertical: 16
    }
})

export default ModifyScreen