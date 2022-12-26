import { Module } from '@nestjs/common';
import { OperationsService } from './operation/operations.service';
import { EquationService } from './equation/equation.service';

@Module({
  providers: [OperationsService, EquationService],
  exports: [EquationService],
})
export class MathModule {}
