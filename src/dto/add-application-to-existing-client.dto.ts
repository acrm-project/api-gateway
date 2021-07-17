import { IssuesType } from 'src/types/issues.type'
import { VehicleType } from 'src/types/vehicle.type'

export class AddApplicationToExistingClientDto {
  readonly clientId: string
  readonly vehicle: VehicleType
  readonly issues: IssuesType
}
