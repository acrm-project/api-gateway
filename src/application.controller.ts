import { Body, Controller, Get, HttpException, HttpStatus, Inject, Post } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

import { CreateApplicationFromScratchDto } from './dto/create-application-from-scratch.dto'

import { ICreateClientResponse } from './interfaces/ICreateClientResponse.interface'
import { ICreateApplicationResponse } from './interfaces/ICreateApplicationResponse.interface'

@Controller('applications')
export class ApplicationController {
  constructor(
    @Inject('APPLICATION_SERVICE')
    private readonly applicationServiceClient: ClientProxy,
    @Inject('CLIENT_SERVICE')
    private readonly clientServiceClient: ClientProxy,
  ) {}

  public async createApplicationFromScratch(@Body() application: CreateApplicationFromScratchDto) {
    const createClientResponse: ICreateClientResponse = await this.clientServiceClient
      .send('client_create', application.client)
      .toPromise()

    const createApplicationResponse: ICreateApplicationResponse = await this.applicationServiceClient
      .send('application_create', {
        clientId: createClientResponse.id,
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
      status: HttpStatus.CREATED,
      application: createApplicationResponse.application,
    }
  }
}
