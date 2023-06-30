import React, { useState } from 'react'
import { Image, StyleSheet, TextInput, View, TouchableOpacity, TouchableNativeFeedback, Platform, Keyboard } from 'react-native'

interface Props {
    onInsert: (text: string) => void
}

function AddTodo({ onInsert }: Props): JSX.Element {
    const [ text, setText ] = useState<string>('')

    const onPress = (): void => {
        onInsert(text)
        setText('')
        Keyboard.dismiss()
    }

    const button: JSX.Element = (
        <View style={ styles.button }>
            <Image source={ require('../assets/icons/add_white/add_white.png') } />
        </View>
    )

	return (
        <View style={ styles.container }>
            <TextInput placeholder='할 일을 입력하세요.' value={ text } onChangeText={ setText } onSubmitEditing={ onPress } style={ styles.input } returnKeyType='done' />
            
            { Platform.select({
                ios: <TouchableOpacity onPress={ onPress } activeOpacity={ 0.5 }>{ button }</TouchableOpacity>,
                android: 
                <View style={ styles.circleContainer }>
                    <TouchableNativeFeedback onPress={ onPress }>{ button }</TouchableNativeFeedback>
                </View>
            })}
        </View>
	)
}

const styles = StyleSheet.create({
    container: {
        height: 64,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        paddingHorizontal: 16,

        borderColor: '#bdbdbd',
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    input: {
        flex: 1,

        fontSize: 16,

        paddingVertical: 8
    },
    button: {
        width: 48,
        height: 48,

        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 24,

        backgroundColor: '#26a69a'
    },
    circleContainer: {
        overflow: 'hidden',

        borderRadius: 24
    }
})

export default AddTodo
