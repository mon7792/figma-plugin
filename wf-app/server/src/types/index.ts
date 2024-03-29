// APIResponse contains fields to display information incase of failure or error condition.
export interface APIResponse {
  code: number;
  type: string;
  message: string;
}

// TodoResponse contains fields to display todo information.
export interface TodoResponse {
  id: string
  title: string;
  done: boolean;
};

// TodoRequest contains title for the new todo.
export interface TodoRequest {
  title: string;
};

// User info
export type User = {
  id?: string
  name?: string
  email?: string
}