export interface IGetClientByIdResponse {
  clientId: number
  client: {
    name: string
    surname: string
    phoneNumber: string
    email: string
  }
  error: string | null
  status: number
}
