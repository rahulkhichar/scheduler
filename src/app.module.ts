import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobMetadata } from './schedular/jobMetadata.entity';
import { SchedulerService } from './schedular/schedular.service';
import { JobMetaDataRepository } from './schedular/repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobMetadata]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [JobMetadata],
      synchronize: true,
      extra: {
        authPlugins: {
          mysql_native_password: true,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, SchedulerService, JobMetaDataRepository],
})
export class AppModule {}
