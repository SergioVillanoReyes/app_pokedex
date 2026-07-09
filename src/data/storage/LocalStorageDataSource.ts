import { NativeModules } from 'react-native'
import { ILocalStorage } from './ILocalStorage'

const StorageModule = NativeModules?.StorageModule

export class LocalStorageDataSource implements ILocalStorage {
  async setItem(key: string, value: string): Promise<void> {
    try {
      if (!StorageModule) return
      await StorageModule.setItem(key, value)
    } catch (error) {
      console.warn('LocalStorageDataSource.setItem error:', error)
    }
  }

  async getItem(key: string): Promise<string | null> {
    try {
      if (!StorageModule) return null
      return await StorageModule.getItem(key)
    } catch (error) {
      console.warn('LocalStorageDataSource.getItem error:', error)
      return null
    }
  }
}
