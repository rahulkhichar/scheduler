// src/scheduler/scheduler.service.ts
import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';


import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserServices {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>) {

    }

    async addUser(user: Partial<User>) {
        return await this.userRepository.save(user);
    }

    async getUser(user: Partial<User>): Promise<User> {

        const userRepo = this.userRepository.createQueryBuilder('user');
        if (user.id) {
            userRepo.where('user.id=:id', { id: user.id });
        } else if (user.email) {
            userRepo.where('user.email=:id', { email: user.email });

        }
        return userRepo.getOne();
    }
}
