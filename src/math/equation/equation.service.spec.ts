import { Test, TestingModule } from '@nestjs/testing';
import { EquationService } from './equation.service';
import { randNumber } from '@ngneat/falso';
import { OperationsService } from '../operation/operations.service';
import { createMock } from '@golevelup/ts-jest';

describe('EquationService', () => {
  let service: EquationService;
  // let opService: OperationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EquationService,
        {
          provide: OperationsService,
          useValue: createMock<OperationsService>(),
        },
      ],
    }).compile();

    service = module.get<EquationService>(EquationService);
    // opService = module.get<OperationsService>(OperationsService);
  });

  it('calculate simple sum operation', () => {
    const num1 = randNumber();
    const num2 = randNumber();

    const expression = `${num1}+${num2}`;

    service.orderOperations(expression);
    const result = service.executeOperations();
    expect(result).toBe(num1 + num2);
  });
});
