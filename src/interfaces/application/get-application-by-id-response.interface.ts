import { IApplication } from './application.interface'

export interface IGetApplicationByIdResponse {
  application: IApplication
  status: number
  error: string | null
}
