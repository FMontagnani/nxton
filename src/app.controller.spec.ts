import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { MathModule } from './math/math.module';
import { IEquationSolver } from './math/interfaces';
// import { EquationService } from './math/equation/equation.service';

const EquationServiceStub: jest.Mocked<IEquationSolver> = {
  orderOperations: jest.fn(),
  executeOperations: jest.fn(),
};

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [MathModule],
      controllers: [AppController],
      providers: [
        {
          provide: IEquationSolver,
          useValue: EquationServiceStub,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return multiply result', () => {
      EquationServiceStub.executeOperations.mockImplementationOnce(() => 6);

      expect(appController.calculate({ equation: '2 * 3' })).toEqual({
        result: 6,
      });
    });
  });
});
