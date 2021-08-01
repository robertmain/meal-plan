export enum AJAX_STATUS {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
}

export type Ajax = {
  errors: Error[];
  status: AJAX_STATUS;
}
