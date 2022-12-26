import { Injectable } from '@nestjs/common';
import { IOperations } from '../interfaces';
import { ZeroDivisionException } from './operations.exceptions';

@Injectable()
export class OperationsService implements IOperations {
  add(num1: number, num2: number) {
    return num1 + num2;
  }

  subtract(num1: number, num2: number) {
    return num1 - num2;
  }

  multiply(num1: number, num2: number) {
    return num1 * num2;
  }

  divide(num1: number, num2: number) {
    if (num2 === 0) {
      throw new ZeroDivisionException();
    }

    return num1 / num2;
  }
}
