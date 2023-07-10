import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { User } from './users'

export interface Post {
    user: User,
    photoURL?: string,
    description?: string
}

interface Update {
    id: string,
    description?: string
}

export const PAGE_SIZE = 12

export const postsCollection: FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData> = firestore().collection('posts')

export function createPost({ user, photoURL, description }: Post){
    return postsCollection.add({
        user,
        photoURL,
        description,
        createdAt: firestore.FieldValue.serverTimestamp() // 데이터 생성 날짜가 서버시간으로 등록됨
    })
}

export async function getPosts(userId: string) {
    let query = postsCollection.orderBy('createdAt', 'desc').limit(PAGE_SIZE)
    
    if (userId) {
        query = query.where('user.id', '==', userId)
    }
    const snapshot = await query.get()

    const posts: Post[] = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
    }))

    return posts
}

export async function getOlderPosts(id: string, userId: string) {
    const cursorDoc = await postsCollection.doc(id).get()
    let query = postsCollection
        .orderBy('createdAt', 'desc')
        .startAfter(cursorDoc)
        .limit(PAGE_SIZE)

    if (userId) {
        query = query.where('user.id', '==', userId)
    }
    const snapshot = await query.get()
    
    const posts: Post[] = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
    }))

    return posts
}

export async function getNewerPosts(id: string, userId: string) {
    const cursorDoc = await postsCollection.doc(id).get()
    let query = postsCollection
        .orderBy('createdAt', 'desc')
        .endBefore(cursorDoc)
        .limit(PAGE_SIZE)

    if (userId) {
        query = query.where('user.id', '==', userId)
    }
    const snapshot = await query.get()

    const posts: Post[] = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
    }))

    return posts
}

export function removePost(id: string) {
    return postsCollection.doc(id).delete()
}

export function updatePost({ id, description }: Update) {
    return postsCollection.doc(id).update({
        description
    })
}