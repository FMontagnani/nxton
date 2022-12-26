import { Injectable } from '@nestjs/common';
import { IOperations } from '../interfaces';

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
      throw new Error("Invalid operation, can't divide by 0");
    }

    return num1 / num2;
  }
}
