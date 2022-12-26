import { Body, Controller, Post } from '@nestjs/common';
import { IEquationSolver } from './math/interfaces';

interface EquationDTO {
  equation: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: IEquationSolver) {}

  @Post()
  calculate(@Body() equationDTO: EquationDTO) {
    const result = this.appService.executeOperations(equationDTO.equation);

    return { result };
  }
}
