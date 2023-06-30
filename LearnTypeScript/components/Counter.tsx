import React from "react"
import { View, Text, StyleSheet, Button } from 'react-native'

interface Counter {
    count: number,
    increaseCount: () => void,
    decreaseCount: () => void,
}

function Counter({ count, increaseCount, decreaseCount }: Counter) {
    return (
        <View style={ styles.container}>
            <View style={ styles.numberArea }>
                <Text style={ styles.number }>{ count }</Text>
            </View>

            <Button title="+1" onPress={ increaseCount } />
            <Button title="-1" onPress={ decreaseCount } />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    numberArea: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center'
    },
    number: {
        fontSize: 72,
        fontWeight: 'bold'
    }
})

export default Counter