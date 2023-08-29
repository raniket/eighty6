import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IndegoModule } from './indego/indego.module';
import { WeatherModule } from './weather/weather.module';
import { authMiddleware } from './middleware/auth-middleware';

@Module({
    imports: [
        ConfigModule.forRoot(),
        PrismaModule,
        IndegoModule,
        WeatherModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(authMiddleware)
          .forRoutes({ path: 'api/v1/*', method: RequestMethod.ALL });
      }
}
