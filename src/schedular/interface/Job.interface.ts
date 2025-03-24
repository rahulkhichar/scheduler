export interface Job {
  name: string;
  interval: number;
  task: () => Promise<void>;
  maxRetries: number;
  timeout: number;
  persist: boolean;
}

// export interface JobMetadata {
//   name: string;
//   status: 'pending' | 'running' | 'completed' | 'failed';
//   lastRunTime: Date | null;
//   nextRunTime: Date | null;
//   retryCount: number;
// }
