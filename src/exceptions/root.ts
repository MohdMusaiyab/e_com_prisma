// We need message , statuscodes and errors

class HttpException extends Error {
  message: string;
  errorCode: any;
  statusCode: number;
  errors: any;
  constructor(
    message: string,
    errorCode: any,
    statusCode: number,
    errors: any
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export enum ErrorCodes {
  USER_NOT_FOUND = "1001",
  USER_AlREADY_EXISTS = "1002",
  INVALID_CREDENTIALS = "1003",
  INVALID_REQUEST = "1004",
}
