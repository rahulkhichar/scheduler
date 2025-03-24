import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Job } from './interface';
import { JobMetadata } from './jobMetadata.entity';

import { JobStatus } from './enum';
import { JobMetaDataRepository } from './repository';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);
  private readonly jobs: Job[] = [];

  private jobIntervals: { [jobName: string]: NodeJS.Timeout } = {}; // Store interval timers
  constructor(private readonly jobMetadatarepositiry: JobMetaDataRepository) {}

  addJob(job: Job): void {
    this.jobs.push(job);
    this.scheduleJob(job);
  }
  private async getJobMetadata(jobName: string): Promise<JobMetadata> {
    return await this.jobMetadatarepositiry.findJob({
      where: {
        name: jobName,
      },
    });
  }
  private async updateJobMetadata(
    jobName: string,
    updates: Partial<JobMetadata>,
  ): Promise<void> {
    const jobMetadata = await this.getJobMetadata(jobName);

    updates.id = jobMetadata.id;

    await this.jobMetadatarepositiry.createJobMetadata(updates);
  }
  private async createJobMetadata(jobName: string): Promise<void> {
    const jobMetaData: Partial<JobMetadata> = {
      name: jobName,
    };
    await this.jobMetadatarepositiry.createJobMetadata(jobMetaData);
  }

  private async scheduleJob(job: Job): Promise<void> {
    const runJob = async () => {
      let retries = 0;
      let timeoutId: NodeJS.Timeout | null = null;
      let jobCompleted = false;
      let metadata: Partial<JobMetadata> | null = null;
      if (job.persist) {
        metadata = await this.getJobMetadata(job.name);
        if (!metadata) {
          await this.createJobMetadata(job.name);
          metadata = {
            name: job.name,
            status: JobStatus.PENDING,
            lastRunTime: null,
            nextRunTime: new Date(Date.now() + job.interval),
            retryCount: 0,
          };
        }
      }
      const runWithTimeout = async () => {
        try {
          if (job.persist) {
            await this.updateJobMetadata(job.name, {
              status: JobStatus.RUNNING,
            });
          }
          timeoutId = setTimeout(() => {
            if (!jobCompleted) {
              this.logger.error(`Job ${job.name} timed out.`);
              throw new Error(`Job ${job.name} timed out.`);
            }
          }, job.timeout);
          this.logger.log(
            `[${new Date().toISOString()}] Job ${job.name} started`,
          );
          if (job.persist) {
            await this.updateJobMetadata(job.name, {
              lastRunTime: new Date(),
              nextRunTime: new Date(Date.now() + job.interval),
            });
          }
          await job.task();
          jobCompleted = true;
          this.logger.log(
            `[${new Date().toISOString()}] Job ${job.name} completed`,
          );
          if (job.persist) {
            await this.updateJobMetadata(job.name, {
              status: JobStatus.COMPLETED,
            });
          }
        } catch (error) {
          if (retries < job.maxRetries) {
            retries++;
            this.logger.warn(
              `Job ${job.name} failed, retrying (${retries}/${job.maxRetries}).`,
            );
            if (job.persist) {
              await this.updateJobMetadata(job.name, { retryCount: retries });
            }
            await new Promise((resolve) => setTimeout(resolve, 5000)); // 5-second delay
            await runWithTimeout();
          } else {
            this.logger.error(
              `Job ${job.name} failed after ${job.maxRetries} retries.`,
              error,
            );
            if (job.persist) {
              await this.updateJobMetadata(job.name, {
                status: JobStatus.FAILED,
              });
            }
          }
        } finally {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
        }
      };
      await runWithTimeout();
    };
    // Store the interval ID
    this.jobIntervals[job.name] = setInterval(runJob, job.interval);
  }
}
