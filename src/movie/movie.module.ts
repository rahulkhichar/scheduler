import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { MovieController } from './movie.controller';
import { MovieServices } from './movie.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([Movie]),
    ],
    controllers: [MovieController],
    providers: [MovieServices],
})
export class MovieModule { }
