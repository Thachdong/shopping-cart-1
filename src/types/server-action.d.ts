interface IServerActionResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
