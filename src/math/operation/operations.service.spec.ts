import { Test, TestingModule } from '@nestjs/testing';
import { OperationsService } from './operations.service';
import { randNumber } from '@ngneat/falso';

describe('OperationsService', () => {
  let service: OperationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperationsService],
    }).compile();

    service = module.get<OperationsService>(OperationsService);
  });

  it('should add 2 numbers', () => {
    const num1 = randNumber();
    const num2 = randNumber();

    const result = service.add(num1, num2);

    expect(result).toBe(num1 + num2);
  });

  it('should subtract 2 numbers', () => {
    const num1 = randNumber();
    const num2 = randNumber();

    const result = service.subtract(num1, num2);

    expect(result).toBe(num1 - num2);
  });

  it('should multiply 2 numbers', () => {
    const num1 = randNumber();
    const num2 = randNumber();

    const result = service.multiply(num1, num2);

    expect(result).toBe(num1 * num2);
  });

  it('should divide 2 numbers', () => {
    const num1 = randNumber();
    const num2 = randNumber({ min: 1 });

    const result = service.divide(num1, num2);

    expect(result).toBe(num1 / num2);
  });

  it('should throw error for invalid operation', () => {
    const num1 = randNumber();
    const num2 = 0;

    try {
      service.divide(num1, num2);
    } catch (err: unknown) {
      expect((err as Error).message).toBe(
        "Invalid operation, can't divide by 0",
      );
    }
  });
});
