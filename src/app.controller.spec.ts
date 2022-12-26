import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { MathModule } from './math/math.module';
import { EquationService } from './math/equation/equation.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [MathModule],
      controllers: [AppController],
      providers: [EquationService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.calculate({ equation: '2 + 2' })).toEqual({ result: 4 });
    });
  });
});
