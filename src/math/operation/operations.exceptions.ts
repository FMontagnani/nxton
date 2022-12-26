import { HttpException, HttpStatus } from '@nestjs/common';

export class ZeroDivisionException extends HttpException {
  constructor() {
    super("Bad Request: Can't divide by zero!", HttpStatus.BAD_REQUEST);
  }
}
