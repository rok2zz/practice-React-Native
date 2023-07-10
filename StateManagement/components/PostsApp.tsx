import { ActivityIndicator, Button, FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native"
import usePosts from "../hooks/usePosts"

function PostsApp(): JSX.Element {
    const { data, loading, refetch } = usePosts({ enabled: true })

    return (
        <SafeAreaView style={ styles.container }>
            { data ? (
                <FlatList style={ styles. list } data={ data } renderItem={({ item }): JSX.Element => (
                    <View style={ styles.item }>
                        <Text>{ item.title }</Text> 
                    </View>                
                    )} keyExtractor={(item): string => item.id.toString()}
                    ItemSeparatorComponent={(): JSX.Element => <View style={ styles.separator } />} 
                    ListFooterComponent={(): JSX.Element => <View style={ styles.separator } />} />
            ) : (
                <ActivityIndicator size='large' color='black' style={ styles.loading } />
            )}
            <Button title='새로고침' onPress={ refetch } disabled={ loading } />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    list: {
        flex: 1
    },
    loading: {
        flex: 1
    },
    item: {
        padding: 8
    },
    separator: {
        height: 1,
        
        backgroundColor: 'black'
    }
})

export default PostsApp