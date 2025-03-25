import { Injectable, OnModuleInit } from '@nestjs/common';
import { SchedulerService } from './schedular/schedular.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly schedulerService: SchedulerService) { }

  onModuleInit() {
    this.setupJobs();
  }

  setupJobs() {

    //   this.schedulerService.addJob({
    //     name: 'Job A',
    //     interval: 60000, // 1 minute
    //     task: async () => {
    //       console.log('Job A running');
    //     },
    //     timeout: 100,
    //     persist: true, 
    //   });


    //   this.schedulerService.addJob({
    //     name: 'Job B',
    //     interval: 60000, // 1 minute
    //     task: async () => {
    //       console.log('Job B running');
    //       // Simulate a time-consuming operation
    //       await new Promise(resolve => setTimeout(resolve, 20000));
    //       console.log('Job B heavy operation completed');
    //     },
    //     persist: true,
    //   });

    //   // Job C: Runs every 5 minutes and logs
    //   this.schedulerService.addJob({
    //     name: 'Job C',
    //     interval: 300000, // 5 minutes
    //     task: async () => {
    //       console.log('Job C running');
    //     },
    //     persist: true,
    //   });
    // }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
