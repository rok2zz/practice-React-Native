import React from 'react'
import { Pressable, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native'

interface Props {
    type: string
}

const messages: any = {
    NOT_FOUND: '검색 결과가 없습니다.',
    EMPTY_KEYWORD: '검색어를 입력하세요.'
}

function EmtySearchResult({ type }: Props): JSX.Element {

    return (
        <View style={ styles.container }>
            <Text style={ styles.text }>{ messages[type] }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 15,

        color: '#9e9e9e'
    }
})

export default EmtySearchResult