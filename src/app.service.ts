import { Injectable, OnModuleInit } from '@nestjs/common';
import { SchedulerService } from './schedular/schedular.service';
import { Job } from './schedular/interface';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly schedulerService: SchedulerService) { }

  onModuleInit() {
    // this.setupJobs();
  }

  setupJobs() {
    const Job1: Partial<Job> = {
      name: 'Job A',
      retryDelay: 6000,
      interval: 2000,
      task: async () => {
        console.log('Job A running');
        await new Promise((resolve) => setTimeout(resolve, 101));
      },
      maxRetries: 3,
      timeout: 100,
    };

    const Job2: Partial<Job> = {
      name: 'Job B',
      interval: 1500,
      maxRetries: 3,
      task: async () => {
        console.log('Job B running');
        await new Promise((resolve) => setTimeout(resolve, 5000));
        console.log('Job B heavy operation completed');
      },
    };

    const Job3: Partial<Job> = {
      name: 'Job C',
      interval: 1000, // 1 minute
      maxRetries: 3,
      timeout: 4001,
      task: async () => {
        console.log('Job C running');
        await new Promise((resolve) => setTimeout(resolve, 4000));
        console.log('Job C heavy operation completed');
      },
    };
    this.schedulerService.addJob(Job1);
    this.schedulerService.addJob(Job2);
    this.schedulerService.addJob(Job3);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
