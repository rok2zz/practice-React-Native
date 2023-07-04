import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Logs } from '../contexts/LogContext'
import FeedListItem from './FeedListItem'

interface Props {
    logs: Logs[],
    onScrolledToBottom(isBottom: boolean): void | undefined,
    ListHeaderComponent: JSX.Element
}

function FeedList({ logs, onScrolledToBottom, ListHeaderComponent }: Props): JSX.Element {    
    const onScroll: any = (e: any): void => {
        if (!onScrolledToBottom) {
            return
        }
        const { contentSize, layoutMeasurement, contentOffset } = e.nativeEvent
        
        const distanceFromBottom: number = contentSize.height - layoutMeasurement.height - contentOffset.y

        if (distanceFromBottom < 72) {
            onScrolledToBottom(true)
        } else {
            onScrolledToBottom(false)
        }
    }

    return (
        <FlatList data={ logs } style={ styles. container } renderItem={({ item }): JSX.Element => <FeedListItem log={ item } />}
            keyExtractor={ (log: Logs): string => log.id } ItemSeparatorComponent={ (): JSX.Element => <View style={ styles.separator } />} 
            onScroll={ onScroll } ListHeaderComponent={ ListHeaderComponent }/>
    )
}

const styles = StyleSheet.create({
	container: {
        flex: 1
	},
    separator: {
        width: '100%',
        height: 1,

        backgroundColor: '#e0e0e0'
    }
})

export default FeedList