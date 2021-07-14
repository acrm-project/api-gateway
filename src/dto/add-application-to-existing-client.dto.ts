import { IssuesType } from 'src/types/IssuesType'
import { VehicleType } from 'src/types/VehicleType'

export class AddApplicationToExistingClientDto {
  readonly clientId: string
  readonly vehicle: VehicleType
  readonly issues: IssuesType
}
