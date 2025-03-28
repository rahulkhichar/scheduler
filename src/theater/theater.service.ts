// src/scheduler/scheduler.service.ts
import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';


import { InjectRepository } from '@nestjs/typeorm';
import { Theater } from './theater.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TheaterServices {
    constructor(
        @InjectRepository(Theater)
        private readonly theaterRepository: Repository<Theater>) {

    }

    async addTheater(movie: Partial<Theater>) {
        return await this.theaterRepository.save(movie);
    }

    async getTheater(theater: Partial<Theater>) {
        const theaterQuery = this.theaterRepository.createQueryBuilder('theater');
        if (theater.id) {
            theaterQuery.where('theater.id=:id', { id: theater.id });
        } else if (theater.name) {
            theaterQuery.where('theater.name=:title', { name: theater.name });
        }
        return theaterQuery.getOne();
    }



}
