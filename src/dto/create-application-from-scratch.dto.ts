import { ClientType } from '../types/ClientType'
import { VehicleType } from '../types/VehicleType'
import { IssuesType } from '../types/IssuesType'

export class CreateApplicationFromScratchDto {
  readonly client: ClientType
  readonly vehicle: VehicleType
  readonly issues: IssuesType
}
