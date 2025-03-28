import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobMetadata } from './schedular/jobMetadata.entity';
import { SchedulerService } from './schedular/schedular.service';
import { JobMetaDataRepository } from './schedular/repository';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { MovieModule } from './movie/movie.module';
import { Movie } from './movie/movie.entity';
import { ThreaterModule } from './theater/theater.module';
import { Theater } from './theater/theater.entity';

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
      entities: [JobMetadata, User, Movie, Theater],
      synchronize: true,
      extra: {
        authPlugins: {
          mysql_native_password: true,
        },
      },
    }),
    UserModule,
    MovieModule,
    ThreaterModule
  ],
  controllers: [AppController],
  providers: [AppService, SchedulerService, JobMetaDataRepository],
})
export class AppModule { }
