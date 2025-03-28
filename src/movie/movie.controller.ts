import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Movie } from './movie.entity';
import { MovieServices } from './movie.service';

@Controller('movie')
export class MovieController {
    constructor(private readonly movieService: MovieServices) { }

    @Post()
    async addMovie(
        @Body() movie: Partial<Movie>
    ): Promise<Movie> {
        return await this.movieService.addMovie(movie);
    }

    @Get()
    async findUser(
        @Query() movie: Partial<Movie>
    ): Promise<Movie> {
        return await this.movieService.getMovie(movie);
    }
}
