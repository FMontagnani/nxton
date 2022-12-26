import { Body, Controller, Post } from '@nestjs/common';
import { EquationService } from './math/equation/equation.service';

interface EquationDTO {
  equation: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: EquationService) {}

  @Post()
  calculate(@Body() equationDTO: EquationDTO) {
    this.appService.orderOperations(equationDTO.equation.trim());

    const result = this.appService.executeOperations();

    return { result };
  }
}
