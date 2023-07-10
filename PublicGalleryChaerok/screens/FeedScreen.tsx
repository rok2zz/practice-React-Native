import React, { useEffect } from 'react';
import {  ActivityIndicator, FlatList, RefreshControl, StyleSheet } from 'react-native';
import PostCard from '../components/PostCard';
import usePosts from '../hooks/usePosts';
import SplashScreen from 'react-native-splash-screen';

const renderItem = ({ item }: any): JSX.Element => (
    <PostCard createAt={ item.createdAt } description={ item.description } id={ item.id } user={ item.user }
        photoURL={ item.photoURL } />
)

function FeedScreen(): JSX.Element {
    const { posts, noMorePost, refreshing, onLoadMore, onRefresh } = usePosts('')
    const postsReady = posts !== null

    useEffect((): void =>{
        if (postsReady) {
            SplashScreen.hide()
        }
    }, [ postsReady ])


    return (
        <FlatList data={ posts } renderItem={ renderItem } keyExtractor={(item: any) => item.id } 
            contentContainerStyle={ styles.container } onEndReached={ onLoadMore } onEndReachedThreshold={ 0.75 }
            ListFooterComponent={ !noMorePost ? (<ActivityIndicator style={ styles.spinner } size={ 32 } color='#6200ee' />) : <></> }
            refreshControl={ <RefreshControl onRefresh={ onRefresh } refreshing={ refreshing } /> } />
    )
}

const styles = StyleSheet.create ({
    container: {
        paddingBottom: 48
    },
    spinner: {
        height: 64
    }
})

export default FeedScreen
