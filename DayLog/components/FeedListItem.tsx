import React from 'react'
import { StyleSheet, Pressable, Text, Platform } from 'react-native'
import { Logs } from '../contexts/LogContext'
import { format, formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'
import { useNavigation } from '@react-navigation/native'

function formatDate(date: Date): string {
    const d: Date = new Date(date)
    const now: number = Date.now()
    const diff = (now - d.getTime()) / 1000

    if (diff < 60 * 1) return '방금 전'
    if (diff < 60 * 60 * 24 * 3) return formatDistanceToNow(d, { addSuffix: true, locale: ko })
    
    return format(d, 'PPP EEE p', { locale: ko })
}

function truncate(text: string): string {
    const replaced: string = text.replace(/\n/g, ' ')

    if (replaced.length <= 100) {
        return replaced
    }
    
    return replaced.slice(0, 100).concat('...')
}

function FeedListItem({ log }: any): JSX.Element {    
    const { title, body, date }: Logs = log
    const navigation: any = useNavigation()

    const onPress: any = (): void => {
        navigation.navigate('Write', { log })
    }

    return (
        <Pressable style={({ pressed }) => [ styles.container, Platform.OS === 'ios' && pressed && { backgroundColor: '#efefef' }]}
            android_ripple={{ color: '#ededed' }} onPress={ onPress }>
            <Text style={ styles.date }>{ new Date(date).toLocaleString() }</Text>
            <Text style={ styles.date }>{ formatDate(date) }</Text>
            <Text style={ styles.title }>{ title }</Text>
            <Text style={ styles.body }>{ truncate(body) }</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
	container: {
        paddingHorizontal: 16,
        paddingVertical: 24,

        backgroundColor: 'white'
	},
    date: {
        fontSize: 12,

        marginBottom: 8,

        color: '#546e7a'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',

        marginBottom: 8,

        color: '#263238'
    },
    body: {
        fontSize: 16,

        lineHeight: 21,

        color: '#37474f'
    }
})

export default FeedListItem