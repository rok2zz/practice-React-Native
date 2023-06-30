import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

interface Source {
    uri: string
}

function Empty(): JSX.Element {
    const source: Source = { uri: 'https://via.placeholder.com/150' }

	return (
        <View style={ styles.container }>
            <Image source={ require('../assets/images/young_and_happy.png') } style={ styles.image } resizeMode='cover' />
            {/* <Image source={ source } style={ styles.image} resizeMode='contain' /> */}
            <Text style={ styles.description }>야호! 할 일이 없습니다.</Text>
        </View>
	)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'sky'
    },
    image: {
        width: 300,
        height: 200,
        backgroundColor: 'grey'
    },
    description: {
        fontSize: 24,
        color: '#9e9e9e'
    }
})

export default Empty
