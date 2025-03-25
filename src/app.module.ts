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
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'newpassword',
      database: 'schedular',
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
export class AppModule { }
