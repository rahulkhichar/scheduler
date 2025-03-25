export interface Job {
  name: string;
  retryDelay: number;
  interval: number;
  task: () => Promise<void>;
  maxRetries: number;
  timeout: number;
}


