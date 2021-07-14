import { ClientType } from 'src/types/ClientType'
import { IssuesType } from 'src/types/IssuesType'
import { VehicleType } from 'src/types/VehicleType'

export class CreateApplicationFromScratchDto {
  readonly client: ClientType
  readonly vehicle: VehicleType
  readonly Issues: IssuesType
}
