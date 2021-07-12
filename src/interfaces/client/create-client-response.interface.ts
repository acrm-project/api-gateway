import { IClient } from './client.interface'

export interface ICreateClientResponse {
  client: IClient
  error: string | null
  status: number
}
