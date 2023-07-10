import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export interface User {
    id?: string,
    displayName?: string,
    photoURL?: string
}

export const usersCollection: FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData> = firestore().collection('users')

export function createUser({ id, displayName, photoURL }: User){
    return usersCollection.doc(id ?? '').set({
        id,
        displayName,
        photoURL
    })
}

export async function getUser(id: string): Promise<FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>> {
    const doc: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData> = await usersCollection.doc(id).get()
    return doc.data() ?? {} as any
}