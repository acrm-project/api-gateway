import { IApplication } from './application.interface'

export interface AppApplicationToExistingClientResponse {
  application: IApplication
  error: string | null
  status: number
}
