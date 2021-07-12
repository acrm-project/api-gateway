import { ClientType } from 'src/types/ClientType'
import { IssuesType } from 'src/types/IssuesType'
import { Status } from 'src/types/Status.enum'
import { VehicleType } from 'src/types/VehicleType'

export interface AppApplicationToExistingClientResponse {
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
