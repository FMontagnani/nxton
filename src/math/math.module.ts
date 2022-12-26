import { Module } from '@nestjs/common';
import { OperationsService } from './operation/operations.service';
import { EquationService } from './equation/equation.service';
import { IEquationSolver, IOperations } from './interfaces';

@Module({
  providers: [
    OperationsService,
    EquationService,
    {
      provide: IOperations,
      useClass: OperationsService,
    },
    {
      provide: IEquationSolver,
      useClass: EquationService,
    },
  ],
  exports: [
    OperationsService,
    EquationService,
    {
      provide: IOperations,
      useClass: OperationsService,
    },
    {
      provide: IEquationSolver,
      useClass: EquationService,
    },
  ],
})
export class MathModule {}
