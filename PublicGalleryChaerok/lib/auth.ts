import auth from '@react-native-firebase/auth'

export interface Sign {
    email: string,
    password: string
}

export function signIn({ email, password }: Sign){
    return auth().signInWithEmailAndPassword(email, password)
}

export function signUp({ email, password }: Sign) {
    return auth().createUserWithEmailAndPassword(email, password)
}

export function subscribeAuth(callback: any) {
    return auth().onAuthStateChanged(callback)
}

export function signOut() {
    return auth().signOut()
}