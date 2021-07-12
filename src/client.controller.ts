import { Controller, Get, Inject, Post } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

@Controller('clients')
export class ClientController {
  constructor(
    @Inject('CLIENT_SERVICE') private readonly clientServiceClient: ClientProxy,
  ) {}

  @Post()
  public async createClient() {}
}
