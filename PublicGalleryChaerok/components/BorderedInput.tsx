import React, { ComponentPropsWithoutRef } from 'react';
import { StyleSheet, TextInput } from 'react-native';

interface Props extends ComponentPropsWithoutRef<any> {
	hasMarginBottom: boolean
}

function BorderedInput({ hasMarginBottom, ...rest }: Props, ref: React.LegacyRef<TextInput> | undefined): JSX.Element {

	return (
		<TextInput style={[ styles.input, hasMarginBottom && styles.margin ]} ref={ ref } { ...rest } />
	)
}

const styles = StyleSheet.create ({
	input: {
		height: 48,

		paddingHorizontal: 16,

		borderWidth: 1,
		borderRadius: 4,
		borderColor: '#bdbdbd',

		backgroundColor: 'white'
	},
	margin: {
		marginBottom: 16
	}
})
export default React.forwardRef(BorderedInput)
