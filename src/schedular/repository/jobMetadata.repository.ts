import { Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JobMetadata } from '../jobMetadata.entity';

@Injectable()
export class JobMetaDataRepository {
  constructor(
    @InjectRepository(JobMetadata)
    private readonly jobMetadatsRepository: Repository<JobMetadata>,
  ) {}

  async findJob(options: FindOneOptions<JobMetadata>): Promise<JobMetadata> {
    return await this.jobMetadatsRepository.findOne(options);
  }

  async createJobMetadata(
    jobMetadata: Partial<JobMetadata>,
  ): Promise<JobMetadata> {
    return await this.jobMetadatsRepository.save(jobMetadata);
  }
}
