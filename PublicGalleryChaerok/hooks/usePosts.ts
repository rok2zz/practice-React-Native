import { useCallback, useEffect, useState } from "react"
import { PAGE_SIZE, getNewerPosts, getOlderPosts, getPosts } from "../lib/posts"
import { useUserContext } from "../contexts/UserContext"
import usePostsEventEffect from "./usePostsEventEffect"

export default function usePosts(userId: string) {
    const [ posts, setPosts ]: any = useState([])
    const [ noMorePost, setNoMorePost ] = useState<boolean>(false)
    const [ refreshing, setRefreshing ] = useState<boolean>(false)
    const { user }: any = useUserContext()

    const onLoadMore = async (): Promise<void> => {
        if (noMorePost || !posts || posts.length < PAGE_SIZE) return

        const lastPost = posts[posts.length - 1]
        const olderPosts = await getOlderPosts(lastPost.id, userId)

        if (olderPosts.length < PAGE_SIZE) {
            setNoMorePost(true)
        }

        setPosts(posts.concat(olderPosts))
    }

    const onRefresh = useCallback(async (): Promise<void> => {
        if (!posts || posts.length === 0 || refreshing) return

        const firstPost = posts[0]
        setRefreshing(true)

        const newerPosts = await getNewerPosts(firstPost.id, userId)
        setRefreshing(false)

        if (newerPosts.length === 0) return

        setPosts(newerPosts.concat(posts))
    }, [ posts, userId, refreshing ])

    useEffect((): void => {
        getPosts(userId).then((_posts) => {
            setPosts(_posts)

            if (_posts.length < PAGE_SIZE) {
                setNoMorePost(true)
            }
        })
    }, [ userId ])

    const removePost = useCallback(
        (postId: string) => {
            setPosts(posts.filter((post: any) => post.id !== postId))
        }, [ posts ]
    )

    const updatePost = useCallback(({ postId, description }: any) => {
        const nextPosts = posts.map((post: any) => 
            post.id === postId ? {
                ...post,
                description
            }: post)

            setPosts(nextPosts)
    }, [ posts ])

    usePostsEventEffect({
        refresh: onRefresh,
        removePost,
        enabled: !userId || userId === user.id,
        updatePost
    })

    return {
        posts,
        noMorePost,
        refreshing,
        onLoadMore,
        onRefresh
    }
}