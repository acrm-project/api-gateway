import { Body, Controller, Get, HttpException, Inject, Param, Post } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { lastValueFrom, Observable } from 'rxjs'

import { CreateApplicationFromScratchDto } from './dto/create-application-from-scratch.dto'
import { AddApplicationToExistingClientDto } from './dto/add-application-to-existing-client.dto'

import { ICreateClientResponse } from './interfaces/client/create-client-response.interface'
import { IGetClientByIdResponse } from './interfaces/client/get-client-by-id-response.interface'
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
    const observableStreamClient: Observable<ICreateClientResponse> = this.clientServiceClient.send(
      'client_create',
      application.client,
    )

    const createClientResponse: ICreateClientResponse = await lastValueFrom(observableStreamClient)

    const observableStreamApplication: Observable<ICreateApplicationResponse> = this.applicationServiceClient.send(
      'application_create',
      {
        clientId: createClientResponse.client.id,
        application,
      },
    )

    const createApplicationResponse: ICreateApplicationResponse = await lastValueFrom(observableStreamApplication)

    if (createApplicationResponse.error) {
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
    const observableStreamClient: Observable<IGetClientByIdResponse> = this.clientServiceClient.send(
      'client_find_by_id',
      application.clientId,
    )

    const getClientByIdResponse: IGetClientByIdResponse = await lastValueFrom(observableStreamClient)

    if (getClientByIdResponse.error) {
      throw new HttpException(
        {
          error: getClientByIdResponse.error,
        },
        getClientByIdResponse.status,
      )
    }

    const observableStreamApplication: Observable<AddApplicationToExistingClientResponse> =
      this.applicationServiceClient.send('application_add_to_existing_client', {
        client: getClientByIdResponse.client,
        clientId: getClientByIdResponse.client.id,
        vehicle: application.vehicle,
        issues: application.issues,
      })

    const addApplicationResponse: AddApplicationToExistingClientResponse = await lastValueFrom(
      observableStreamApplication,
    )

    return {
      status: getClientByIdResponse.status,
      application: addApplicationResponse.application,
    }
  }

  @Get('/:id')
  public async getApplicationById(@Param('id') id: string) {
    const observableStream: Observable<IGetApplicationByIdResponse> = this.applicationServiceClient.send(
      'application_find_by_id',
      id,
    )

    const getApplicationByIdPesponse: IGetApplicationByIdResponse = await lastValueFrom(observableStream)

    if (getApplicationByIdPesponse.error) {
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
