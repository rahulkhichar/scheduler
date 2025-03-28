import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserServices } from './user.service';
import { UserController } from './user.controller';


@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [UserController],
    providers: [UserServices],
})
export class UserModule { }
