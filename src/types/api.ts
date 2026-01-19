
export type ResponseType<T> = {
  data: T
  message?: string
  statusCode: number
}

export enum STATUS_CODE {
  SUCCESS = 200,
  CREATED = 201,
  UNAUTHORIZED = 401
}
