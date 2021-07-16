import { Controller, Get, Inject, Param } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { lastValueFrom, Observable } from 'rxjs'

import { IGetClientByIdResponse } from './interfaces/client/get-client-by-id-response.interface'
import { IGetClientBySearchQueryResponse } from './interfaces/client/get-client-by-search-query-response.interface'

@Controller('clients')
export class ClientController {
  constructor(@Inject('CLIENT_SERVICE') private readonly clientServiceClient: ClientProxy) {}

  @Get('/:id')
  public async getClientById(@Param('id') id: string) {
    const observableStream: Observable<IGetClientByIdResponse> = this.clientServiceClient.send('client_find_by_id', id)

    const getClientByIdResponse: IGetClientByIdResponse = await lastValueFrom(observableStream)

    return getClientByIdResponse
  }

  @Get('/:query')
  public async getClientBySearchQuery(@Param('query') query: string) {
    const observableStream: Observable<IGetClientBySearchQueryResponse> = this.clientServiceClient.send(
      'client_by_search_query',
      query,
    )

    const getClientBySearchQueryResponse: IGetClientBySearchQueryResponse = await lastValueFrom(observableStream)

    return getClientBySearchQueryResponse
  }
}
