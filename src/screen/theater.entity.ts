
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';


@Entity({ name: 'screen' })
export class Screen {

    // id: string;
    // theaterId: string;
    // screenNumber: number;
    // seats: Seat[];
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100 })
    theaterId: string;

    @Column()
    screenNumber: number;
}
