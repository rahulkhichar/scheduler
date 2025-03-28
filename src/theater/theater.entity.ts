
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';


@Entity({ name: 'theater' })
export class Theater {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 100 })
    location: string;
}
