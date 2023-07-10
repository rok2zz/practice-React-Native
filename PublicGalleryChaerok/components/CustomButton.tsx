import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
	onPress(): void,
	title: string,
	hasMarginBottom: boolean,
	theme: SVGFESpecularLightingElement
}

function CustomButton({ onPress, title, hasMarginBottom, theme }: Props): JSX.Element {
	const isPrimary: boolean = theme === 'primary'

	return (
		<View style={[ styles.container, hasMarginBottom && styles.margin ]}>
			<Pressable style={({ pressed }) => [ styles.wrapper, isPrimary && styles.primaryWrapper, Platform.OS === 'ios' && pressed && { opacity: 0.5 }]}
				onPress={ onPress } android_ripple={{ color: isPrimary ? '#ffffff' : '#6200ee' }}>
				<Text style={[ styles.text, isPrimary ? styles.primaryText : styles.secondaryText ]}>{ title }</Text>
			</Pressable>
		</View>
	)	
}

CustomButton.defaultProps = {
	theme: 'primary',
	onPress: (): void => {},
	hasMarginBottom: false
}

const styles = StyleSheet.create ({
	container: {
		borderRadius: 4,

		overflow: 'hidden'
	},
	wrapper: {
		height: 48,

		alignItems: 'center',
		justifyContent: 'center',

		borderRadius: 4,
	},
	primaryWrapper: {
		backgroundColor: '#6200ee'
	},
	text: {
		fontSize: 14,
		fontWeight: 'bold',

		color: 'white'
	},
	primaryText: {
		color: 'white'
	},
	secondaryText: {
		color: '#6200ee'
	},
	margin: {
		marginBottom: 8
	}
})


export default CustomButton
