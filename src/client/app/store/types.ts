export enum REQUEST_STATUS {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
}

export type Request = {
  errors: Error[];
  status: REQUEST_STATUS;
}
