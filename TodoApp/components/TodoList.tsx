import React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import { Todos } from '../App'
import TodoItem from './TodoItem'

interface Props {
    todos: Todos[],
    onToggle: (id: number) => void,
    onRemove: (id: number) => void
}

function TodoList({ todos, onToggle, onRemove }: Props): JSX.Element {

	return (
        <FlatList style={ styles.list } data={ todos } 
            ItemSeparatorComponent={() => <View style={ styles.seperator } />}
            renderItem={({ item }) => (
                <TodoItem id={ item.id } text={ item.text } done={ item.done } onToggle={ onToggle } onRemove={ onRemove } />
            )}
            keyExtractor={ item => item.id.toString() }
         />
	)
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    seperator: {
        height: 1,

        backgroundColor: '#e0e0e0'
    }
})

export default TodoList
