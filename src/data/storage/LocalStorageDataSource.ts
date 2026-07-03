import { NativeModules, Platform } from 'react-native'
import { ILocalStorage } from './ILocalStorage'

const { StorageModule } = NativeModules
const isAndroid = Platform.OS === 'android'

export class LocalStorageDataSource implements ILocalStorage {
  async setItem(key: string, value: string): Promise<void> {
    if (!isAndroid || !StorageModule) return
    await StorageModule.setItem(key, value)
  }

  async getItem(key: string): Promise<string | null> {
    if (!isAndroid || !StorageModule) return null
    return StorageModule.getItem(key)
  }
}
