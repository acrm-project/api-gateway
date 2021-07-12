import { Module } from '@nestjs/common'
import { ClientProxyFactory } from '@nestjs/microservices'

import { ClientController } from './client.controller'
import { ApplicationController } from './application.controller'

import { ConfigService } from './services/config/config.service'

@Module({
  imports: [],
  controllers: [ClientController, ApplicationController],
  providers: [
    {
      provide: 'CLIENT_SERVICE',
      useFactory: (configService: ConfigService) => {
        const clientServiceOptions = configService.get('clientService')
        return ClientProxyFactory.create(clientServiceOptions)
      },
      inject: [ConfigService],
    },
    {
      provide: 'APPLICATION_SERVICE',
      useFactory: (configService: ConfigService) => {
        const applicationServiceOptions =
          configService.get('applicationService')
        return ClientProxyFactory.create(applicationServiceOptions)
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
