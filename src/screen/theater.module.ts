import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theater } from './theater.entity';
import { TheaterController } from './theater.controller';
import { TheaterServices } from './theater.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([Theater]),
    ],
    controllers: [TheaterController],
    providers: [TheaterServices],
})
export class ThreaterModule { }
