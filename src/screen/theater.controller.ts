import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Theater } from './theater.entity';
import { TheaterServices } from './theater.service';

@Controller('theater')
export class TheaterController {
    constructor(private readonly theaterServices: TheaterServices) { }

    @Post()
    async addMovie(
        @Body() theater: Partial<Theater>
    ): Promise<Theater> {
        return await this.theaterServices.addTheater(theater);
    }

    @Get()
    async findUser(
        @Query() theater: Partial<Theater>
    ): Promise<Theater> {
        return await this.theaterServices.getTheater(theater);
    }
}
