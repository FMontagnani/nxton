import { Injectable } from '@nestjs/common';
import { IEquationSolver, IOperations } from '../interfaces';

const OPERANDS = {
  SUM: '+',
  SUBTRACT: '-',
  MULTIPLY: '*',
  DIVIDE: '/',
  LEFT: '(',
  RIGHT: ')',
};

const PREDENCES = {
  SUM: '2',
  SUBTRACT: '2',
  MULTIPLY: '3',
  DIVIDE: '3',
};

function shuntingYardAlgorithm(expression: string) {
  const outputStack = [];
  const operatorStack = [];

  expression.split('').forEach((value) => {
    if (!Number.isNaN(value)) {
      outputStack.push(value);
    }

    if (value === OPERANDS.LEFT) {
      operatorStack.push(value);
    }

    if (value === OPERANDS.RIGHT) {
      while (operatorStack[operatorStack.length - 1] !== OPERANDS.LEFT) {
        const operator = operatorStack.pop();
        outputStack.push(operator);
      }
      if (operatorStack[operatorStack.length - 1] === OPERANDS.LEFT) {
        operatorStack.pop();
      }
    }

    while (checkOperatorSteps(operatorStack, value)) {
      const operator = operatorStack.pop();
      outputStack.push(operator);
    }
    operatorStack.push(value);
  });

  operatorStack.forEach(() => {
    const operand = operatorStack.pop();
    outputStack.push(operand);
  });

  return outputStack;
}

function checkOperatorSteps(stack: string[], value: string) {
  const topOperand = stack[stack.length - 1];

  return (
    topOperand !== OPERANDS.LEFT && PREDENCES[topOperand] >= PREDENCES[value]
  );
}

@Injectable()
export class EquationService implements IEquationSolver {
  stack = [];
  operations = [];

  constructor(private readonly operator: IOperations) {}

  orderOperations(equation: string) {
    this.operations = shuntingYardAlgorithm(equation);
  }

  executeOperations(): number {
    let num1;
    let num2;

    this.operations.forEach((value) => {
      if (!Number.isNaN(value)) {
        this.stack.push(value);
      }

      if (value in Object.keys(OPERANDS)) {
        num2 = this.stack.pop();
        num1 = this.stack.pop();

        if (value === OPERANDS.SUM) {
          this.stack.push(this.operator.add(num1, num2));
        }

        if (value === OPERANDS.SUBTRACT) {
          this.stack.push(this.operator.subtract(num1, num2));
        }

        if (value === OPERANDS.MULTIPLY) {
          this.stack.push(this.operator.multiply(num1, num2));
        }

        if (value === OPERANDS.DIVIDE) {
          this.stack.push(this.operator.divide(num1, num2));
        }
      }
    });

    return this.stack.pop();
  }
}
