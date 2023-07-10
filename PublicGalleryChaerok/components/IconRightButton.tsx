import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
	name: string,
	color: string,
	onPress(): void
}

function IconRightButton({ name, color, onPress }: Props): JSX.Element {

	return (
		<View style={ styles.container }>
			<Pressable style={({ pressed }): any =>[
				styles.circle, Platform.OS === 'ios' && pressed && { opeacity: 0.3 }
				]} onPress={ onPress } android_ripple={{ color: '#eee'}}>
				
				<Icon name={ name } color={ color } size={ 24 } />
			</Pressable>
		</View>
	)	
}

IconRightButton.defaultProps = {
	color: '#6200ee'
}

const styles = StyleSheet.create ({
	container: {
		marginRight: -8,

		borderRadius: 24,

		overflow: 'hidden'
	},
	circle: {
		width: 48,
		height: 48,

		alignItems: 'center',
		justifyContent: 'center'
	}
})


export default IconRightButton
