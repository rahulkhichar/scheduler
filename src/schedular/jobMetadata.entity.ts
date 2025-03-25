import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JobStatus } from './enum';

@Entity({ name: 'JobMetaData' })
export class JobMetadata {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ default: JobStatus.PENDING })
  status: JobStatus;

  @Column({ default: null })
  lastRunTime: Date;

  @CreateDateColumn({ default: null })
  nextRunTime: Date;

  @Column()
  retryCount: number;
}
