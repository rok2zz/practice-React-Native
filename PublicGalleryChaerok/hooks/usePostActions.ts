import { useNavigation, useRoute } from "@react-navigation/native"
import { useState } from "react"
import { Platform, ActionSheetIOS } from "react-native"
import { removePost } from "../lib/posts"
import events from "../lib/events"

interface Props {
    id: string,
    description: string
}

export default function usePostActions({ id, description }: Props) {
    const [ isSelecting, setIsSelecting ] = useState<boolean>(false)
    const navigation: any = useNavigation()
    const route = useRoute()

    const edit = (): void => {
        navigation.navigate('Modify', {
            id, description
        })
    }

    const remove = async (): Promise<void> => {
        await removePost(id)

        if (route.name === 'Post') {
            navigation.pop()
        }

        events.emit('removePost', id)
    }

    const onPressMore = (): void => {
        if (Platform.OS === 'android') {
            setIsSelecting(true)
        } else {
            ActionSheetIOS.showActionSheetWithOptions({
                options: ['설명 수정', '게시물 삭제', '취소'],
                destructiveButtonIndex: 1,
                cancelButtonIndex: 2
            }, (butttonIndex) => {
                if (butttonIndex === 0) {
                    edit()
                } else if (butttonIndex === 1) {
                    remove()
                }
            })
        }
    }

    const actions = [
        {
            icon: 'edit',
            text: '설명 수정',
            onPress: edit
        },
        {
            icon: 'delete',
            text: '게시물 삭제',
            onPress: remove
        }
    ]

    const onClose = (): void => {
        setIsSelecting(false)
    }

    return {
        isSelecting,
        onPressMore,
        onClose,
        actions
    }
}