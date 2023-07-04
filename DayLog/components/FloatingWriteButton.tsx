import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, Platform, Pressable, Animated } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

interface Props {
    hidden: boolean
}

function FloatingWriteButton({ hidden }: Props): JSX.Element {    
    const navigation: any = useNavigation()
    
    const onPress = () => {
        navigation.navigate('Write')
    }

	const animation = useRef(new Animated.Value(1)).current

    useEffect((): void => {
		Animated.spring(animation, {
			toValue: hidden ? 1 : 0,
			useNativeDriver: true,
            tension: 45,
            friction: 5
		}).start()
	}, [ animation, hidden ])

    return (
        <Animated.View style={[ styles.wrapper, {
            transform: [{
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 88]
                })
            }],
            opacity: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0]
            }) 
        }]}>
            <Pressable style={({ pressed }) => [ styles.button, Platform.OS === 'ios' && { opacity: pressed ? 0.6 : 1}]} 
                android_ripple={{ color: 'white'}} onPress={ onPress }>
                <Icon name='add' size={ 24 } style={ styles.icon } />   
            </Pressable>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
	wrapper: {
        width: 56,
        height: 56,

        position: 'absolute',
        bottom: 16,
        right: 16,

        borderRadius: 28,

        shadowColor: '#4d4d4d',
        shadowOffset: { width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 4,

        elevation: 5,

        overflow: Platform.select({ android: 'hidden'}) 
	},
    button: {
        width: 56,
        height: 56,

        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 28,

        backgroundColor: '#009688'
    },
    icon: {
        color: 'white'
    }
})

export default FloatingWriteButton