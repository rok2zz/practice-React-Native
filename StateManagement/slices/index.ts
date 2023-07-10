import { combineReducers } from 'redux'
import auth from "./auth"
import todos from './todos'
import posts from './posts'

const rootReducer = combineReducers ({
    auth,
    todos,
    posts
})

export type RootState = ReturnType<typeof rootReducer>

declare module 'react-redux' {
    interface DefaultRootState extends RootState {} //선언시 useSelector 에서 타입 자동 추론
}

export default rootReducer