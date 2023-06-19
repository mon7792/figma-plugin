// APIResponse contains fields to display information incase of failure or error condition.
export interface APIResponse {
  code: number;
  type: string;
  message: string;
}