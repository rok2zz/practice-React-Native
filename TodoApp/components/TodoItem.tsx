import React from 'react'
import { Alert } from 'react-native'
import { Image, Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

interface Props {
    id: number,
    text: string,
    done: boolean,
    onToggle: (id: number) => void
    onRemove: (id: number) => void
}

function TodoItem({ id, text, done, onToggle, onRemove }: Props): JSX.Element {
    const remove = (): void => {
        Alert.alert(
            '삭제',
            '정말로 삭제하시겠어요?',
            [
                { text: '취소', onPress: (): void => {}, style: 'cancel' },
                { text: '삭제', onPress: (): void => { onRemove(id) }, style: 'destructive' }
            ],
            {
                cancelable: true,
                onDismiss: (): void => {}
            }
        )
    }

	return (
        <View style={ styles.item }>
            { Platform.select({
                ios: 
                <TouchableOpacity onPress={ () => onToggle(id) }>
                    <View style={ [styles.circle, done && styles.filled] }>
                        { done && (<Image source={ require('../assets/icons/check_white/check_white.png') } resizeMode='contain' />)}
                    </View>
                </TouchableOpacity>,
                
                android: 
                <TouchableNativeFeedback onPress={ () => onToggle(id) } >
                    <View style={ [styles.circle, done && styles.filled] } >
                        { done && (<Image source={ require('../assets/icons/check_white/check_white.png') } resizeMode='contain' />)}
                    </View>
                </TouchableNativeFeedback>
            })}
            
            <Text style={ [styles.text, done && styles.lineThrough ] }>{ text }</Text>
            
            { Platform.select({
                ios: 
                <TouchableOpacity onPress={ done ? remove : () => {} }>
                    { done ? (
                        <Icon name='delete' size={ 32 } color={ 'red' }/>
                    ):(
                        <View style={ styles.removePlaceholder } />
                    )}
                </TouchableOpacity>,
                
                android: 
                <TouchableNativeFeedback onPress={ done ? remove : () => {} } >
                    { done ? (
                        <Icon name='delete' size={ 32 } color={ 'red' }/>
                    ):(
                        <View style={ styles.removePlaceholder } />
                    )}
                </TouchableNativeFeedback>
            })}
            
        </View>
	)
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',

        padding: 16,
    },
    circle: {
        width: 24,
        height: 24,

        marginRight: 16,

        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#26a69a',

        backgroundColor: 'skyblue'
    },
    filled: {
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#26a69a'
    },
    text: {
        flex: 1,

        fontSize: 16,
        fontWeight: 'bold',

        color: '#212121'
    },
    lineThrough: {
        color: '#9e9e9e',

        textDecorationLine: 'line-through'
    },
    removePlaceholder: {
        width: 32,
        height: 32
    }
})

export default TodoItem
