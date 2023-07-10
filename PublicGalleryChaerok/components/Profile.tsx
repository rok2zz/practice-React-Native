import React, { useEffect, useState } from "react"
import { getUser } from "../lib/users"
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native"
import Avatar from "./Avatar"
import PostGridItem from "./PostGridItem"
import usePosts from "../hooks/usePosts"

interface Props {
    userId: string
}

const renderItem = ({ item }: any): JSX.Element => <PostGridItem post={ item } />

function Profile({ userId }: Props): JSX.Element {
    const [ user, setUser ]: any = useState(null)
    const { posts, noMorePost, refreshing, onLoadMore, onRefresh } = usePosts(userId)
    
    useEffect((): void => {
        getUser(userId).then(setUser)
    }, [ userId ])

    if (!user || !posts) {
        return (
            <ActivityIndicator style={ styles.spinner } size={ 32 } color='#6200ee' />
        )
    }

    return (
        <FlatList style={ styles.container } data={ posts } renderItem={ renderItem } numColumns={ 3 }
            keyExtractor={(item) => item.id} ListHeaderComponent={ 
                <View style={ styles.userInfo }>
                    <Avatar source={ user.photoURL && { uri: user.photoURL }} size={ 128 } style={ '' } />
                    <Text style={ styles.username }>{ user.displayName }</Text>
                </View>
            } onEndReached={ onLoadMore } onEndReachedThreshold={ 0.25 } ListFooterComponent={ 
              !noMorePost ? (<ActivityIndicator style={ styles.bottomSpinner } size={ 32 } color='#6200ee' />) : <></>
        } refreshControl={ <RefreshControl onRefresh={ onRefresh } refreshing={ refreshing } /> } />
    )
}

const styles = StyleSheet.create ({
    spinner: {
        flex: 1,
        justifyContent: 'center'
    },
    container: {
        flex: 1
    },
    userInfo: {
        alignItems: 'center',

        paddingTop: 80,
        paddingBottom: 64
    },
    username: {
        fontSize: 24,

        marginTop: 8,

        color: '#424242'
    },
    bottomSpinner: {
        height: 128
    }
})

export default Profile