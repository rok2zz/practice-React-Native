import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../slices/posts";
import { useCallback, useEffect } from "react";
import { RootState } from "../slices";

export default function usePosts({ enabled = true }: { enabled: boolean }) {
    const posts = useSelector((state: RootState) => state.posts.posts)
    const dispatch = useDispatch<any>()
    const fetchData = useCallback((): void => {
        dispatch(fetchPosts())
    }, [ dispatch ])

    useEffect((): void => {
        if (!enabled) return

        fetchData()
    }, [ enabled, fetchData ])

    return {
        ...posts,
        refetch: fetchData
    }
}