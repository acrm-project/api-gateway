import { Error } from 'src/types/common/error.type'
import { StatusCode } from 'src/types/common/status-code.type'
import { IApplication } from './application.interface'

export interface AddApplicationToExistingClientResponse {
  application: IApplication
  error: Error
  status: StatusCode
}
