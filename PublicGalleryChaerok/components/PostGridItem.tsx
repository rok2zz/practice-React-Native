import { Image, Pressable, StyleSheet, useWindowDimensions } from "react-native"
import { Post } from "../lib/posts"
import { useNavigation } from "@react-navigation/native"

interface Props {
    post: Post
}
function PostGridItem({ post }: Props): JSX.Element {
    const navigation: any = useNavigation()
    const dimensions = useWindowDimensions()
    const size = (dimensions.width - 3) / 3

    const onPress = (): void => {
        navigation.navigate('Post', { post })
    }

    return (
        <Pressable onPress={ onPress } style={({ pressed }) => [
            { width: size, height: size, opacity: pressed ? 0.6 : 1 }, styles.container 
        ]}>
            <Image style={ styles.image } source={{ uri: post.photoURL! }} resizeMethod='resize' resizeMode='cover' />

        </Pressable>
    )
}

const styles = StyleSheet.create ({
    container: {
        margin: 0.5
    },
    image: {
        width: '100%',
        height: '100%',

        backgroundColor: '#bdbdbd'
    }
})

export default PostGridItem