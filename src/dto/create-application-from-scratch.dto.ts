import { ClientType } from '../types/client.type'
import { IssuesType } from 'src/types/issues.type'
import { VehicleType } from 'src/types/vehicle.type'

export class CreateApplicationFromScratchDto {
  readonly client: ClientType
  readonly vehicle: VehicleType
  readonly Issues: IssuesType
}
