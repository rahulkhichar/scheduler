// src/scheduler/scheduler.service.ts
import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';


import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MovieServices {
    constructor(
        @InjectRepository(Movie)
        private readonly movieRepository: Repository<Movie>) {

    }

    async addMovie(movie: Partial<Movie>) {
        return await this.movieRepository.save(movie);
    }

    async getMovie(movie: Partial<Movie>) {
        const userRepo = this.movieRepository.createQueryBuilder('movie');
        if (movie.id) {
            userRepo.where('movie.id=:id', { id: movie.id });
        } else if (movie.title) {
            userRepo.where('movie.title=:title', { title: movie.title });
        }
        return userRepo.getOne();
    }



}
