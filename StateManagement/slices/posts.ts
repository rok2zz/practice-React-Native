import { PayloadAction, SerializedError, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPosts } from "../api/getPosts";
import { Post } from "../api/types";

export const fetchPosts = createAsyncThunk('posts/fetchUsers', getPosts)

export interface PostsState {
    posts: {
        loading: boolean,
        data: Post[] | null,
        error: SerializedError | null
    }
}

const initialState: PostsState = {
    posts: {
        loading: false,
        data: null,
        error: null
    }
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
            .addCase(fetchPosts.pending.type, (state: PostsState) => { //요청 시작
                state.posts = {
                    loading: true,
                    data: null,
                    error: null
                }
            })
            .addCase(fetchPosts.fulfilled.type, (state: PostsState, action: PayloadAction<Post[]>) => { //요청 성공
                state.posts.data = action.payload
                state.posts.loading = false
            })
            .addCase(fetchPosts.rejected.type, (state: PostsState, action: ReturnType<typeof fetchPosts.rejected>) => { // 요청 실패
                state.posts.error = action.error
                state.posts.loading = false
            })
    } 
})

export default postsSlice.reducer