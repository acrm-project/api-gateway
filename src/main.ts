import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import { ConfigService } from './services/config/config.service'

const configService = new ConfigService()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(configService.get('port'))
}
bootstrap()
