import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, StyleSheet, Pressable, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

interface Props {
    name: string,
    color: string,
    hasMarginRight: boolean,
    onPress: any
}

function TransparentCircleButton({ name, color, hasMarginRight, onPress }: Props): JSX.Element {        
    return (
        <View style={ [styles.iconButtonWrapper, hasMarginRight && styles.marginRight ] }>
            <Pressable style={({ pressed }): any => [ styles.iconButton, Platform.OS === 'ios' && pressed && { backgroundColor: '#efefef' }]}
                onPress={ onPress } android_ripple={{ color: '#ededed' }}>
                <Icon name={ name } size={ 24 } color={ color } />   
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
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
    marginRight: {
        marginRight: 8
    }
})

export default TransparentCircleButton