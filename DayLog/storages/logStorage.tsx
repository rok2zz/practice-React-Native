import AsyncStorage from "@react-native-community/async-storage"

interface logsStorage {
    get(): Promise<any>;
    set(data: any): Promise<void>;
}

const key: string = 'logs'

const logsStorage = {
    async get() {
        try {
            const raw: any = await AsyncStorage.getItem(key)
            const parsed = JSON.parse(raw)

            return parsed
        } catch (e: any) {
            throw new Error('Failed to load logs')
        }
    },
    async set(data: any) {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(data))
        } catch (e: any) {
            throw new Error('Failed to save logs')
        }
    }
}

export default logsStorage