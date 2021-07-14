import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ClientProxyFactory } from '@nestjs/microservices'

import { ClientController } from './client.controller'
import { ApplicationController } from './application.controller'

import { ConfigService } from './services/config/config.service'

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ClientController, ApplicationController],
  providers: [
    ConfigService,
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
        const applicationServiceOptions = configService.get('applicationService')
        return ClientProxyFactory.create(applicationServiceOptions)
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
