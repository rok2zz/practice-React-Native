import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import DateHead from './components/DateHead'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import AddTodo from './components/AddTodo'
import Empty from './components/Empty'
import TodoList from './components/TodoList'
import AsyncStorage from '@react-native-community/async-storage'
import todosStorage from './storages/todosStorage'

export interface Todos {
	id: number,
	text: string,
	done: boolean
}

function App(): JSX.Element {
    const today = new Date()

	const [ todos, setTodos ] = useState<Todos[]>([
		{ id: 1, text: '작업환경 설정', done: true },
		{ id: 2, text: '리액트 네이티브 기초 공부', done: false },
		{ id: 3, text: '투두리스트 만들어보기', done: false }
	])

	useEffect((): void => {
		todosStorage
			.get()
			.then(setTodos)
			.catch(console.error)
	}, [])

	useEffect((): void => {
		todosStorage
			.set(todos)
			.catch(console.error)
	}, [todos])


	const onInsert = (text: string) => {
		const nextId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1

		const todo = {
			id: nextId,
			text,
			done: false
		}

		setTodos(todos.concat(todo))
	}

	const onToggle = (id: number) => {
		const nextTodos = todos.map(todo =>
			todo.id === id ? { ...todo, done: !todo.done } : todo
		)

		setTodos(nextTodos)
	}

	const onRemove = (id: number) => {
		const nextTodos = todos.filter(todo => todo.id !== id)

		setTodos(nextTodos)
	}

	return (
		<SafeAreaProvider>
			<SafeAreaView style={ styles.container } edges={ ['bottom'] }>
				<KeyboardAvoidingView behavior={ Platform.select({ ios: 'padding' }) } style={ styles.avoidContainer }>
					<DateHead date= { today } />

					{ todos.length === 0 ? (<Empty />) : (<TodoList todos={ todos } onToggle={ onToggle } onRemove={ onRemove } />)}
					
					<AddTodo onInsert={ onInsert } />
				</KeyboardAvoidingView>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	avoidContainer: {
		flex: 1
	}
})

export default App
