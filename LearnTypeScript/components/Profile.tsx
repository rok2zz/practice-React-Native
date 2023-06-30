import React from "react"
import { View, Text, StyleSheet, Image } from 'react-native'

interface Props {
    name: string,
    isActive?: boolean,
    image?: string,
    children?: React.ReactNode
}

function Profile({ name, isActive, image = 'https://picsum.photos/200', children }: Props) {
    return (
        <View style={ isActive && styles.activeStyle}>
            <Image source={{ uri: image }} style={ styles.imageStyle } />
            <Text>{ name }</Text>
            <View>{ children }</View>
        </View>
    )
}

Profile.defaultProps = {
    image: 'https://picsum.photos/200'
}

const styles = StyleSheet.create({
    activeStyle: {
        flex: 1,
        height: 300,

        marginBottom: 30,

        backgroundColor: 'yellow'
    },
    imageStyle: {
        flex: 2,
        height: 200 
    }
})

export default Profile