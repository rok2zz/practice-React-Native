import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface Props {
    visible: boolean,
    onClose(): void,
    actions: any
}

function ActionSheetModal({ visible, onClose, actions }: Props): JSX.Element {
    return (
        <Modal visible={ visible } transparent={ true } animationType="fade" onRequestClose={ onClose }>
            <Pressable style={ styles.background } onPress={ onClose }>
                <View style={ styles.whiteBox }>
                    { actions.map((action: any) => (
                        <Pressable style={ styles.actionButton } android_ripple={{ color: '#eee' }}
                            onPress={(): void => { 
                                action.onPress() 
                                onClose() }} key={ action.text }>
                            <Icon name={ action.icon } color='#757575' size={ 24 } style={ styles.icon } />
                            <Text style={ styles.text }>{ action.text }</Text>
                        </Pressable>
                    ))}
                </View>
            </Pressable>
        </Modal>
    )
}

const styles = StyleSheet.create ({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    whiteBox: {
        width: 300,

        borderRadius: 4,

        backgroundColor: 'white',

        elevation: 2
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',

        padding: 16
    },
    icon: {
        marginRight: 8
    },
    text: {
        fontSize: 16
    }
})


export default ActionSheetModal