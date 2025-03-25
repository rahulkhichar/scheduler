// src/scheduler/scheduler.service.ts
import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { Job } from './interface';
import { JobMetaDataRepository } from './repository';
import { JobMetadata } from './jobMetadata.entity';
import { JobStatus } from './enum';


@Injectable()
export class SchedulerService {

  constructor(private readonly jobMetadataRepository: JobMetaDataRepository) { }


  addJob(job: Job): void {
    this.scheduleJob(job);
  }





  private async getJobMetadata(jobName: string): Promise<JobMetadata | null> {
    return await this.jobMetadataRepository.findJob({
      where: { name: jobName },
    });

  }


  private async updateJobMetadata(
    jobName: string,
    updates: Partial<JobMetadata>,
  ): Promise<void> {
    try {
      const jobMetadata = await this.getJobMetadata(jobName);
      if (!jobMetadata) {
        await this.createJobMetadata(jobName, updates);
        return;
      }

      await this.jobMetadataRepository.createJobMetadata({
        id: jobMetadata.id,
        ...updates,
      });
    } catch (error) {
    }
  }



  private async createJobMetadata(
    jobName: string,
    initialData?: Partial<JobMetadata>,
  ): Promise<void> {
    const jobMetaData: Partial<JobMetadata> = {
      name: jobName,
      status: JobStatus.PENDING,
      lastRunTime: null,
      nextRunTime: null,
      retryCount: 0,
      ...initialData,
    };
    await this.jobMetadataRepository.createJobMetadata(jobMetaData);

  }


  private async scheduleJob(job: Job): Promise<void> {

    setInterval(async () => {
      await this.executeJob(job);
    }, job.interval);


    const metadata = await this.getJobMetadata(job.name);
    if (!metadata) {
      await this.createJobMetadata(job.name, {
        status: JobStatus.PENDING,
        nextRunTime: new Date(Date.now() + job.interval),
      });
    }


  }


  private async executeJob(job: Job): Promise<void> {

    let jobCompleted = false;

    const nextRunTime = new Date(Date.now() + job.interval);
    await this.updateJobMetadata(job.name, {
      status: JobStatus.RUNNING,
      nextRunTime,
    });

    const startTime = new Date();


    await this.updateJobMetadata(job.name, {
      lastRunTime: startTime,
    });


    const attemptExecution = async (): Promise<void> => {
      const executeWithTimeout = async () => {
        const timeout = new Promise<void>((resolve, reject) => {
          const id = setTimeout(() => {
            if (!jobCompleted) {
              reject(new Error(`Job "${job.name}" timed out after ${job.timeout}ms`));
            }
          }, job.timeout);

          job.task()
            .then(() => {
              jobCompleted = true;
              clearTimeout(id);
            })
            .catch(reject);
        });

        await timeout;
      };

      for (let attempt = 0; attempt <= job.maxRetries; attempt++) {
        try {
          await executeWithTimeout();
          await this.updateJobMetadata(job.name, {
            status: JobStatus.COMPLETED,
            retryCount: 0,
          });
          return;
        } catch (error) {
          await this.updateJobMetadata(job.name, { retryCount: attempt + 1 });

          if (attempt < job.maxRetries) {
            await new Promise(resolve => setTimeout(resolve, job.retryDelay));
          } else {
            await this.updateJobMetadata(job.name, { status: JobStatus.FAILED });
          }
        }
      }
    };

    await attemptExecution();

  }
}