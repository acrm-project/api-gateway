import { Body, Controller, Get, HttpException, HttpStatus, Inject, Param, Post } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

import { CreateApplicationFromScratchDto } from './dto/create-application-from-scratch.dto'
import { AddApplicationToExistingClientDto } from './dto/add-application-to-existing-client.dto'

import { ICreateClientResponse } from './interfaces/client/create-client-response.interface'
import { IGetClientByIdResponse } from './interfaces/client/get-client-by-id-pesponse.interface'
import { ICreateApplicationResponse } from './interfaces/application/create-application-response.interface'
import { AddApplicationToExistingClientResponse } from './interfaces/application/add-application-to-existing-client-response.interface'
import { IGetApplicationByIdResponse } from './interfaces/application/get-application-by-id-response.interface'

@Controller('applications')
export class ApplicationController {
  constructor(
    @Inject('APPLICATION_SERVICE')
    private readonly applicationServiceClient: ClientProxy,
    @Inject('CLIENT_SERVICE')
    private readonly clientServiceClient: ClientProxy,
  ) {}

  @Post('/create')
  public async createApplicationFromScratch(@Body() application: CreateApplicationFromScratchDto) {
    const createClientResponse: ICreateClientResponse = await this.clientServiceClient
      .send('client_create', application.client)
      .toPromise()

    const createApplicationResponse: ICreateApplicationResponse = await this.applicationServiceClient
      .send('application_create', {
        clientId: createClientResponse.client.id,
        application,
      })
      .toPromise()

    if (createApplicationResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          error: createApplicationResponse.error,
        },
        createApplicationResponse.status,
      )
    }

    return {
      status: createApplicationResponse.status,
      application: createApplicationResponse.application,
    }
  }

  @Post('/add')
  public async addApplicationToExistingClient(@Body() application: AddApplicationToExistingClientDto) {
    const getClientByIdResponse: IGetClientByIdResponse = await this.clientServiceClient
      .send('client_find_by_id', application.clientId)
      .toPromise()

    if (getClientByIdResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          error: getClientByIdResponse.error,
        },
        getClientByIdResponse.status,
      )
    }

    const addApplicationResponse: AddApplicationToExistingClientResponse = await this.applicationServiceClient
      .send('application_add_to_existing_client', {
        client: getClientByIdResponse.client,
        clientId: getClientByIdResponse.client.id,
        vehicle: application.vehicle,
        issues: application.issues,
      })
      .toPromise()

    return {
      status: getClientByIdResponse.status,
      application: addApplicationResponse.application,
    }
  }

  @Get('/:id')
  public async getApplicationById(@Param('id') id: string) {
    const getApplicationByIdPesponse: IGetApplicationByIdResponse = await this.applicationServiceClient
      .send('application_find_by_id', id)
      .toPromise()

    if (getApplicationByIdPesponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          error: getApplicationByIdPesponse.error,
        },
        getApplicationByIdPesponse.status,
      )
    }

    return {
      status: getApplicationByIdPesponse.status,
      application: getApplicationByIdPesponse.application,
    }
  }
}
