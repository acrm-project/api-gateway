import { ClientType } from '../../types/ClientType'
import { VehicleType } from '../../types/VehicleType'
import { IssuesType } from '../../types/IssuesType'
import { Status } from '../../types/Status.enum'

export interface ICreateApplicationResponse {
  application: {
    client: ClientType
    vehicle: VehicleType
    issues: IssuesType
    status: Status
    createdAt: string
    startedAt: string
    closedAt: string
    closed: boolean
  }
  error: string | null
  status: number
}
