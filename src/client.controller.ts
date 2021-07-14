import { Controller, Get, HttpException, HttpStatus, Inject, Param, Post } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

import { IGetClientByIdResponse } from './interfaces/client/get-client-by-id-response.interface'
import { IGetClientBySearchQueryResponse } from './interfaces/client/get-client-by-search-query-response.interface'

@Controller('clients')
export class ClientController {
  constructor(@Inject('CLIENT_SERVICE') private readonly clientServiceClient: ClientProxy) {}

  @Get('/:id')
  public async getClientById(@Param('id') id: string) {
    const getClientByIdResponse: IGetClientByIdResponse = await this.clientServiceClient
      .send('client_find_by_id', id)
      .toPromise()

    if (getClientByIdResponse.status !== HttpStatus.OK) {
      if (getClientByIdResponse.status !== HttpStatus.OK) {
        throw new HttpException(
          {
            error: getClientByIdResponse.error,
          },
          getClientByIdResponse.status,
        )
      }
      34
    }

    return {
      status: getClientByIdResponse.status,
      client: getClientByIdResponse.client,
    }
  }

  public async getClientBySearchQuery(@Param('query') query: string) {
    const getClientBySearchQueryResponse: IGetClientBySearchQueryResponse = await this.clientServiceClient
      .send('client_by_search_query', query)
      .toPromise()

    if (getClientBySearchQueryResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          error: getClientBySearchQueryResponse.error,
        },
        getClientBySearchQueryResponse.status,
      )
    }

    return {
      status: getClientBySearchQueryResponse.status,
      client: getClientBySearchQueryResponse.client,
    }
  }
}
