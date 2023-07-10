import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import rootReducer from './slices';
import TodoApp from './components/TodoApp';
import { configureStore } from '@reduxjs/toolkit';
import PostsApp from './components/PostsApp';

const store = configureStore({ reducer: rootReducer })

function App(): JSX.Element {

	return (
		<Provider store={ store }>
			<PostsApp />
		</Provider>
	)
}

const styles = StyleSheet.create({

})

export default App
