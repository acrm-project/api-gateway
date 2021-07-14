export class AddApplicationToExistingClientDto {
  readonly clientId: string

  // vehicle
  readonly brand: string
  readonly model: string
  readonly yearOfIssue: string
  readonly registrationNumber: string
  readonly engineSpecification: string
  readonly VIN: string

  // issues
  readonly description: string
}
