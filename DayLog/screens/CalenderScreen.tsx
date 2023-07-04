import React, { useContext, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CalendarView from '../components/CalendarView';
import LogContext, { Logs } from '../contexts/LogContext';
import { format } from 'date-fns';
import FeedList from '../components/FeedList';

interface Current {
	date: string | number | Date
}

function CalenderScreen(): JSX.Element {
	const { logs }: any = useContext(LogContext)
	const [ selectedDate, setSelectedDate ]: any = useState<string>(format(new Date(), 'yyyy-MM=dd'))

	const markedDates: void = useMemo((): void => logs.reduce((acc: any, current: Current) => {
		const formattedDate: string = format(new Date(current.date), 'yyyy-MM-dd')
		acc[formattedDate] = { marked: true }

		return acc
	}, {}), [ logs ])

	const filteredLogs: Logs[] = logs.filter(
		(log: Logs): boolean => format(new Date(log.date), 'yyyy-MM-dd') === selectedDate
	)

	return (
		<FeedList logs={ filteredLogs } onScrolledToBottom={ (): void => {} } ListHeaderComponent={
			<CalendarView markedDates={ markedDates } selectedDate={ selectedDate } onSelectedDate={ setSelectedDate } />
		}/>
	)
}

export default CalenderScreen
