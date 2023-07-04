import React, { useRef } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'

interface Props {
    title: string,
    body: string,
    onChangeTitle(): void,
    onChangeBody(): void
}

function WriteEditor({ title, body, onChangeTitle, onChangeBody }: Props): JSX.Element {   
    const bodyRef: any = useRef()

    return (
        <View style={ styles.container }>
            <TextInput style={ styles.titleInput } placeholder='제목을 입력하세요' returnKeyType='next'
                onChangeText={ onChangeTitle } value={ title } onSubmitEditing={ (): void => { bodyRef.current.focus() }} />
            <TextInput style={ styles.bodyInput } placeholder='당신의 오늘을 기록해보세요' multiline textAlignVertical='top'
                onChangeText={ onChangeBody } value={ body } ref={ bodyRef } />
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        
        padding: 16
	},
    titleInput: {
        fontSize: 18,
        fontWeight: 'bold',

        paddingVertical: 0,
        marginBottom: 16,

        color: '#263238',
    },
    bodyInput: {
        flex: 1,

        fontSize: 16,

        paddingVertical: 0,

        color: '#263238'
    }
})

export default WriteEditor