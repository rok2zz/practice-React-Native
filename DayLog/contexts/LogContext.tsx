import { createContext, useEffect, useRef, useState } from 'react'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import logsStorage from '../storages/logStorage'

export interface Logs {
    id: string
    title: string,
    body: string,
    date: Date
}

const LogContext: any = createContext<string>('')

export function LogContextProvider({ children }: any): JSX.Element {
    const initialLogsRef: any = useRef(null)
    const [ logs, setLogs ]: any = useState([])
        // Array.from({ length: 10 }).map((_, index) => ({
        //     id: uuidv4(),
        //     title: `Log ${ index }`,
        //     body: `Log ${ index }`,
        //     date: new Date().toISOString()
        // }))
        // .reverse() 1~10 배열 예시 생성

    useEffect((): void => { //IIFE식
        (async (): Promise<void> => {
            const savedLogs: Logs[] = await logsStorage.get()
            if (savedLogs) {
                initialLogsRef.current = savedLogs
                setLogs(savedLogs)
            }
        })()
    }, [])

    useEffect((): void => {
        if (logs === initialLogsRef.current) { return }
        logsStorage.set(logs)
    }, [ logs ])

    const onCreate: any = ({ title, body, date }: Logs): void => {
        const log: Logs = {
            id: uuidv4(),
            title,
            body,
            date
        }
        
        setLogs([ log, ...logs ])
    }

    const onModify: any = (modified: Logs): void =>  {
        const nextLogs: Logs = logs.map((log: Logs): Logs => log.id === modified.id ? modified : log)

        setLogs(nextLogs)
    }

    const onRemove: any = (id: string): void => {
        const nextLogs = logs.filter((log: Logs): boolean => log.id !== id)

        setLogs(nextLogs)
    }

    return (
        <LogContext.Provider value={{ logs, onCreate, onModify, onRemove }}>
                { children }
        </LogContext.Provider>
    )
}

export default LogContext
