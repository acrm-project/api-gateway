import { IApplication } from './application.interface'

export interface AddApplicationToExistingClientResponse {
  application: IApplication
  error: string | null
  status: number
}
