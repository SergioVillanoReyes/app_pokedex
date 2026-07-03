import { NativeModules } from 'react-native'
import { ILocalStorage } from './ILocalStorage'

const { StorageModule } = NativeModules

export class LocalStorageDataSource implements ILocalStorage {
  async setItem(key: string, value: string): Promise<void> {
    await StorageModule.setItem(key, value)
  }

  async getItem(key: string): Promise<string | null> {
    return StorageModule.getItem(key)
  }
}
