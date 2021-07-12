import { IApplication } from './application.interface'

export interface ICreateApplicationResponse {
  application: IApplication
  error: string | null
  status: number
}
