import { useNavigation, useRoute } from "@react-navigation/native"
import { ScrollView, StyleSheet } from "react-native"
import PostCard from "../components/PostCard"
import events from "../lib/events"
import { useEffect } from "react"

function PostScreen(): JSX.Element {
    const route = useRoute()
    const navigation: any = useNavigation()
    const { post }: any = route.params

    useEffect(() => {
        const handler = ({ description }: any) => {
            navigation.setParams({ post: { ...post, description }})
        }

        events.addListener('updatePost', handler)

        return (): void => {
            events.removeListener('updatePost', handler)
        }
    }, [ post, navigation ])

    return (
        <ScrollView contentContainerStyle={ styles.contentContainer }>
            <PostCard user={ post.user } photoURL={ post.photoURL } description={ post.description } 
                createAt={ post.createAt } id={ post.id } />
        </ScrollView>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1
    },
    contentContainer: {
        paddingBottom: 40
    }
})

export default PostScreen