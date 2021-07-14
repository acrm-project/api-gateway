import { Error } from 'src/types/common/error.type'
import { StatusCode } from 'src/types/common/status-code.type'
import { IClient } from './client.interface'

export interface IGetClientByIdResponse {
  client: IClient
  error: Error
  status: StatusCode
}
