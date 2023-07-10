import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useUserContext } from "../contexts/UserContext";
import { signOut } from "../lib/auth";

function SettingScreen(): JSX.Element {
    const { setUser }: any = useUserContext()

    const onLogout = async (): Promise<void> => {
        await signOut

        setUser('')
    }

    return (
        <View style={ styles.containier }>
            <Pressable onPress={ onLogout } style={({ pressed }) => [
                styles.item, pressed && Platform.select({ ios: { opacity: 0.5 }})
            ]}> 
                <Text>로그아웃</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create ({
    containier: {
        flexs: 1,   
        paddingTop: 32
    },
    item: {
        paddingVertical: 16,
        paddingHorizontal: 12,

        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#eeeeee',

        backgroundColor: 'white'
    },
    itemText: {
        fontSize: 16
    }
})

export default SettingScreen