import { useMemo } from "react"
import { View, StyleSheet, Pressable, Image, Text } from "react-native"
import { User } from "../lib/users"
import Avatar from "./Avatar"
import { useNavigation, useNavigationState } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { HomeStackParamList } from "../screens/HomeStack"
import { useUserContext } from "../contexts/UserContext"
import Icon from "react-native-vector-icons/MaterialIcons"
import usePostActions from "../hooks/usePostActions"
import ActionSheetModal from "./ActionSheetModal"

interface Props {
    user: User,
    photoURL: string,
    description: string,
    createAt: any,
    id: string
}

type RootStackNavigationProp = NativeStackNavigationProp<HomeStackParamList>

function PostCard({ user, photoURL, description, createAt, id}: Props): JSX.Element {
    const navigation: any = useNavigation<RootStackNavigationProp>()
    const { isSelecting, onPressMore, onClose, actions } = usePostActions({
        id, description
    })
    const routeNames = useNavigationState((state: any) => state.routeNames)
    const { user: me }: any = useUserContext()
    const isMyPost: boolean = me.id === user.id

    const date: Date = useMemo(() =>
        (createAt ? new Date(createAt._seconds * 1000) : new Date()), [ createAt ]
    )

    const onOpenPrifile = (): void => {
        if (routeNames.find((routeName: string) => routeName === 'MyProfile')) {
            navigation.navigate('MyProfile')
        } else {
            navigation.navigate('Profile', {
                userId: user.id,
                displayName: user.displayName
            })
        }
    }

    return (
        <>
            <View style={ styles.container }>
                <View style={[ styles.head, styles.paddingBlock ]}>
                    <Pressable style={ styles.profile } onPress={ onOpenPrifile }>
                        <Avatar source={ user.photoURL && { uri: user.photoURL ?? '' }} style={ '' } />
                        <Text style={ styles.displayName }>{ user.displayName }</Text>
                    </Pressable>
                    { isMyPost && ( 
                        <Pressable hitSlop={ 8 } onPress={ onPressMore }>
                            <Icon name='more-vert' size={ 20 } />
                        </Pressable>
                    )}
                </View>
                <Image source={{ uri: photoURL }} style={ styles.image } resizeMethod="resize" resizeMode="cover"/>
                <View style={ styles.paddingBlock }>
                    <Text style={ styles.description }>{ description }</Text>
                    <Text style={ styles.date }>{ date.toLocaleString() }</Text>
                </View>
            </View>
            <ActionSheetModal visible={ isSelecting } actions={ actions } onClose={ onClose } />
        </>
    )
}

const styles = StyleSheet.create ({
    container: {
        paddingVertical: 16
    },
    paddingBlock: {
        paddingHorizontal: 16
    },
    head: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        marginBottom: 16
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    displayName: {
        lineHeight: 16,

        fontSize: 16,
        fontWeight: 'bold',

        marginLeft: 8
    },
    image: {
        width: '100%',

        aspectRatio: 1,

        marginBottom: 16,

        backgroundColor: '#bdbdbd'
    },
    description: {
        lineHeight: 24,

        fontSize: 16,

        marginBottom: 8
    },
    date: {
        lineHeight: 18,

        fontSize: 12,

        color: '#757575'
    }
})

export default PostCard