import React, { createContext, useState } from 'react'

const SearchContext: any = createContext<string>('')

export function SearchContextProvider({ children }: any): JSX.Element {
    const [ keyword, onChangeText ]: any = useState<string>('')

    return (
        <SearchContext.Provider value={{ keyword, onChangeText }}>
                { children }
        </SearchContext.Provider>
    )
}

export default SearchContext
