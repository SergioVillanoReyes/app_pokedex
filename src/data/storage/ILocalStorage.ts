export interface ILocalStorage {
  setItem(key: string, value: string): Promise<void>
  getItem(key: string): Promise<string | null>
}
