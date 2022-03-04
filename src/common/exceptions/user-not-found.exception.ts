import { HttpStatus } from '@nestjs/common';
import { ApiException } from './api.exception';

export class UserNotFoundException extends ApiException {
  constructor() {
    super('User account does not exist', HttpStatus.UNAUTHORIZED);
  }
}
