import React, { useContext } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import SearchContext from '../contexts/SearchContext'

function SearchHeader(): JSX.Element {
    const { width }: any = useWindowDimensions()
    const { keyword, onChangeText }: any = useContext(SearchContext)

    return (
        <View style={[ styles.container, { width: width - 32}]}>
            <TextInput style={ styles.input } placeholder='검색어를 입력하세요.' value={ keyword } onChangeText={ onChangeText } autoFocus />
            <Pressable style={({ pressed }: any): any => [ styles.button, pressed && { opacity: 0.5 }]} onPress={(): void => onChangeText('')}>
                <Icon name='cancel' size={ 20 } color='#9e9e9e' />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1
    },
    button: {
        marginLeft: 8
    }
})

export default SearchHeader