import { Test, TestingModule } from '@nestjs/testing';
import { EquationService } from './equation.service';
import { IOperations } from '../interfaces';
import { randNumber } from '@ngneat/falso';

const OperationsServiceStub: jest.Mocked<IOperations> = {
  add: jest.fn(),
  subtract: jest.fn(),
  multiply: jest.fn(),
  divide: jest.fn(),
};

describe('EquationService', () => {
  let service: EquationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EquationService,
        {
          provide: IOperations,
          useValue: OperationsServiceStub,
        },
      ],
    }).compile();

    service = module.get<EquationService>(EquationService);
  });

  it('should calculate simple sum operation', () => {
    const num1 = randNumber();
    const num2 = randNumber();

    OperationsServiceStub.add.mockImplementationOnce(() => num1 + num2);

    const expected = num1 + num2;
    const expression = `${num1} + ${num2}`;

    const result = service.executeOperations(expression);

    expect(result).toBe(expected);
  });

  it('should calculate complex operation operation', () => {
    const num1 = 1;
    const num2 = 2;
    const num3 = 3;

    OperationsServiceStub.add.mockImplementationOnce(() => num1 + num2);
    OperationsServiceStub.divide.mockImplementationOnce(() => num1 / num3);
    OperationsServiceStub.multiply.mockImplementationOnce(
      () => (num1 + num2) * num2,
    );
    OperationsServiceStub.subtract.mockImplementationOnce(
      () => (num1 + num2) * num2 - num1 / num3,
    );

    const expected = Math.ceil((num1 + num2) * num2 - num1 / num3);
    const expression = `( ${num1} + ${num2} ) * ${num2} - ${num1} / ${num3}`;

    const result = service.executeOperations(expression);

    expect(result).toBe(expected);
  });

  it('should calculate complex operation operation with parenthesis in middle', () => {
    const num1 = 1;
    const num2 = 2;
    const num3 = 3;

    OperationsServiceStub.multiply.mockImplementationOnce(() => num2 * num2);
    OperationsServiceStub.divide.mockImplementationOnce(() => num1 / num3);
    OperationsServiceStub.add.mockImplementationOnce(() => num1 + num2 * num2);
    OperationsServiceStub.subtract.mockImplementationOnce(
      () => num1 + num2 * num2 - num1 / num3,
    );

    const expected = Math.ceil(num1 + (num2 * num2 - num1 / num3));
    const expression = `${num1} + ( ${num2} * ${num2} ) - ${num1} / ${num3}`;

    const result = service.executeOperations(expression);

    expect(result).toBe(expected);
  });
});
