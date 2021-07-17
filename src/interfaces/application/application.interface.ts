import { ClientType } from 'src/types/client.type'
import { IssuesType } from 'src/types/issues.type'
import { Status } from 'src/types/status.enum'
import { VehicleType } from 'src/types/vehicle.type'

export interface IApplication {
  client: ClientType
  vehicle: VehicleType
  issues: IssuesType
  status: Status
  createdAt: string
  startedAt: string
  closedAt: string
  closed: boolean
}
