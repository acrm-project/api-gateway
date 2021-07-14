import { Transport } from '@nestjs/microservices'

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null

  constructor() {
    this.envConfig = {}

    this.envConfig.port = process.env.API_GATEWAY_PORT

    this.envConfig.clientService = {
      options: {
        port: process.env.CLIENT_SERVICE_PORT,
        host: process.env.CLIENT_SERVICE_HOST,
      },
      transport: Transport.TCP,
    }
    this.envConfig.applicationService = {
      options: {
        port: process.env.APPLICATION_SERVICE_PORT,
        host: process.env.APPLICATION_SERVICE_HOST,
      },
      transport: Transport.TCP,
    }
  }

  get(key: string) {
    return this.envConfig[key]
  }
}
