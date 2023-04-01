export interface QueueStoreRepository {
  send(queue: string, message: string): Promise<void>;
}
