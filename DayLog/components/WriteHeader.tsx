import { useNavigation } from '@react-navigation/native'
import React, { useReducer, useState } from 'react'
import { View, StyleSheet, Pressable, Text } from 'react-native'
import TransparentCircleButton from './TransparentCircleButton'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

interface Props {
    onSave(): void,
    onAskRemove(): void,
    isEditing: boolean,
    date: Date,
    onChangeDate(date: Date): void
}

interface InitialState {
    mode: string,
    visible: boolean
}

const initialState: InitialState = { mode: 'date', visible: false}

function reducer(state: any, action: { type: string; mode: string }) {
    switch (action.type) {
        case 'open':
            return {
                mode: action.mode,
                visible: true
            }
        case 'close':
            return {
                ...state,
                visible: false
            }
        default:
            throw new Error('Unhandled action type')
    }
}

function WriteHeader({ onSave, onAskRemove, isEditing, date, onChangeDate }: Props): JSX.Element {    
    const navigation: any = useNavigation()

    const [ state, dispatch ]: any = useReducer(reducer, initialState)
    const open: any = (mode: string): void => dispatch({ type: 'open', mode })
    const close: any = (): void => dispatch({ type: 'close' })

    const onGoBack = (): void => {
        navigation.pop()
    }

    const onConfirm: any = (selectedDate: Date): void => {
        close()
        onChangeDate(selectedDate)
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.iconButtonWrapper }>
                <TransparentCircleButton name='arrow-back' onPress={ onGoBack } color='#424242' hasMarginRight={ false } />
            </View>
            <View style={ styles.buttons }>
                { isEditing && (
                    <TransparentCircleButton name='delete-forever' onPress={ onAskRemove } color='#ef5350' hasMarginRight />
                )}
                <TransparentCircleButton name='check' onPress={ onSave } color='#009688' hasMarginRight={ false } />
            </View>

            <View style={ styles.center }>
                <Pressable onPress={ (): void => open('date') }>
                    <Text>{ format(new Date(date), 'PPP', { locale: ko })}</Text>
                </Pressable>
                <View style={ styles.seperator } />
                <Pressable onPress={ (): void => open('time') }>
                    <Text>{ format(new Date(date), 'p', { locale: ko })}</Text>
                </Pressable>
            </View>
            <DateTimePickerModal isVisible={ state.visible } mode={ state.mode } onConfirm={ onConfirm } onCancel={ close } date={ date } />
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
        height: 48,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        paddingHorizontal: 8
	},
    iconButtonWrapper: {
        width: 32,
        height: 32,

        borderRadius: 16,

        overflow: 'hidden'
    },
    iconButton: {
        width: 32,
        height: 32,

        alignItems: 'center',
        justifyContent: 'center',
    
        borderRadius: 16
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    center: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        
        zIndex: -1
    },
    seperator: {
        width: 8
    }
})

export default WriteHeader