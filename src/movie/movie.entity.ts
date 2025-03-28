
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';


@Entity({ name: 'movie' })
export class Movie {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100 })
    title: string;

    @Column({ length: 100 })
    language: string;


    @Column({ length: 100 })
    genre: string;

    @Column()
    duration: number;
}
