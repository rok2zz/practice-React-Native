import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FloatingWriteButton from '../components/FloatingWriteButton';
import LogContext from '../contexts/LogContext';
import FeedList from '../components/FeedList';

function FeedsScreen(): JSX.Element {
	const { logs }: any = useContext(LogContext)
	const [ hidden, setHidden ]: any = useState(false)

	const onScrolledToBottom: any = (isBottom: boolean): void => {
		if (hidden !== isBottom) {
			setHidden(isBottom)
		}
	}

	return (
		<View style={ styles.container } >
			<FeedList logs={ logs } onScrolledToBottom={ onScrolledToBottom } ListHeaderComponent={ <></> } />
			<FloatingWriteButton hidden={ hidden } />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})

export default FeedsScreen
