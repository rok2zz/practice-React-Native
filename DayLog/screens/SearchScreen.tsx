import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import SearchContext from '../contexts/SearchContext';
import LogContext, { Logs } from '../contexts/LogContext';
import FeedList from '../components/FeedList';
import EmptySearchResult from '../components/EmptySearchResult';

function SearchScreen(): JSX.Element {	
	const { keyword }: any = useContext(SearchContext)
	const { logs }: any = useContext(LogContext)

	const filtered: any = keyword === '' ? [] : logs.filter((log: Logs): any =>
		[ log.title, log.body ].some((text: string): boolean => text.includes(keyword))

	)
	
	if (keyword === '') {
		return <EmptySearchResult type='EMPTY_KEYWORD' />
	}

	if (filtered.length === 0) {
		return <EmptySearchResult type='NOT_FOUND' />
	}

	return (
		<View style={ styles.container } >
			<FeedList logs={ filtered } onScrolledToBottom={ (): void => {} } ListHeaderComponent={ <></>} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})

export default SearchScreen
