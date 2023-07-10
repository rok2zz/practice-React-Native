import React, { useState } from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Todo } from '../slices/todos';
import useTodosActions from '../hooks/useTodosActions';
import useTodos from '../hooks/useTodos';

function BlackButton({ onPress, title }: { onPress(): void, title: string}) {
	return (
		<Pressable style={ styles.button } onPress={ onPress } android_ripple={{ color: 'white '}}>
			<Text style={ styles.buttonText }> { title }</Text>
		</Pressable>
	)
}

function TodoItem({ id, text, done }: Todo): JSX.Element {
	const { toggle, remove } = useTodosActions()

	const onToggle = (): void => {
		toggle(id)
	}

	const onRemove = (): void => {
		remove(id)
	}

	return (
		<View style={ styles.todo }>
			<Pressable style={ styles.toggle } onPress={ onToggle }>
				<Text style={ done && styles.doneText }>{ text }</Text>
			</Pressable>
			<BlackButton title='삭제' onPress={ onRemove } />
		</View>
	)
}


function Todos(): JSX.Element {
	const todos = useTodos()

	return (
		<FlatList style={ styles.todos } data={ todos } renderItem={({ item }): JSX.Element => (
			<TodoItem id={ item.id } done={ item.done } text={ item.text } /> )} keyExtractor={(item: Todo): string => item.id.toString()}
			ItemSeparatorComponent={(): JSX.Element => <View style={ styles.separator } />}
			ListFooterComponent={(): JSX.Element => <View style={ styles.separator } />}
		/>
	)
}

function TodoInput(): JSX.Element {
	const [ text, setText ] = useState('')
	const { add } = useTodosActions()

	const onPress = (): void => {
		add(text)
		setText('')
	}

	return (
		<View style={ styles.inputContainer }>
			<TextInput style={ styles.input } placeholder='할 일을 입력하세요' value={ text } onChangeText={ setText } />
			<BlackButton title='등록' onPress={ onPress } />
		</View>
	)
}



function TodoApp(): JSX.Element {

	return (
		<SafeAreaView style={ styles.container }>
			<Todos />
			<TodoInput />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	inputContainer: {
		flexDirection: 'row',

		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: 'black'
	},
	input: {
		flex: 1
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',

		paddingHorizontal: 16,
		paddingVertical: 8,

		backgroundColor: 'black'
	},
	buttonText: {
		color: 'white'
	},
	todos: {
		flex: 1
	},
	todo: {
		flexDirection: 'row'
	},
	toggle: {
		flex: 1,
		justifyContent: 'center'
	},
	doneText: {
		textDecorationLine: 'line-through'
	},
	separator: {
		height: 1,

		backgroundColor: 'black'
	}
})

export default TodoApp
