import { IClient } from './client.interface'

export interface IGetClientByIdResponse {
  client: IClient
  error: string | null
  status: number
}
