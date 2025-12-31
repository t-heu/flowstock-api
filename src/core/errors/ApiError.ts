import type { StatusCode } from 'hono/utils/http-status';
export class ApiError extends Error {
  statusCode: StatusCode;
  isOperacional: boolean;

  constructor(message: string, statusCode: StatusCode = 400) {
    super(message)
    this.isOperacional = true;
    this.statusCode = statusCode
  }
}
