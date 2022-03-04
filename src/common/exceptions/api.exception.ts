import { HttpException } from '@nestjs/common';

export interface ApiExceptionOptions {
  errorCode?: number;
  errors?: any;
}

export class ApiException extends HttpException {
  options: ApiExceptionOptions;

  constructor(
    message: string,
    status = 500,
    options: ApiExceptionOptions = {},
  ) {
    super(message, status);
    this.options = options;
  }
}
