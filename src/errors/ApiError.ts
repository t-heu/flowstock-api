export class ApiError extends Error {
  statusCode: number;
  isOperacional: boolean;

  constructor(message: string, statusCode = 400) {
    super(message)
    this.isOperacional = true;
    this.statusCode = statusCode
  }
}
