import { createContext, useContext, useState } from "react";
import { User } from "../lib/users";

const UserContext = createContext({})

export function UserContextProvider({ children }: any): JSX.Element {
    const [ user, setUser ] = useState<User>({ id: null, displayName: null, photoURL: null })

    return (
        <UserContext.Provider children={ children } value={{ user, setUser }} />
    )
}

export function useUserContext() {
    const userContext = useContext(UserContext)

    if (!userContext) {
        throw new Error('UserContext.Provider is not found')
    }

    return userContext
}