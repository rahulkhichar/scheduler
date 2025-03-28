import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Theater } from './theater.entity';
import { TheaterServices } from './theater.service';

@Controller('theater')
export class TheaterController {
    constructor(private readonly theaterServices: TheaterServices) { }

    @Post()
    async addThreater(
        @Body() theater: Partial<Theater>
    ): Promise<Theater> {
        return await this.theaterServices.addTheater(theater);
    }

    @Get()
    async findThreater(
        @Query() theater: Partial<Theater>
    ): Promise<Theater> {
        return await this.theaterServices.getTheater(theater);
    }
}
