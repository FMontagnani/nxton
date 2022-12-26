import { Injectable } from '@nestjs/common';
import { IEquationSolver, IOperations } from '../interfaces';

const OPERANDS = {
  SUM: '+',
  SUBTRACT: '-',
  MULTIPLY: '*',
  DIVIDE: '/',
};

const GROUP_SIGNS = {
  LEFT: '(',
  RIGHT: ')',
};

const PREDENCES = {
  SUM: '2',
  SUBTRACT: '2',
  MULTIPLY: '3',
  DIVIDE: '3',
};

function checkOperatorSteps(stack: string[], value: string) {
  const topOperand = stack[stack.length - 1];

  return (
    topOperand !== GROUP_SIGNS.LEFT && PREDENCES[topOperand] >= PREDENCES[value]
  );
}

function inRightLimiterCondition(stack: string[]) {
  const lastIndex = stack.length - 1;
  return stack[lastIndex] !== GROUP_SIGNS.LEFT;
}

function isNumber(value: string) {
  return !Number.isNaN(Number(value));
}

function isOperand(value: string) {
  return Object.values(OPERANDS).some((operand) => operand === value);
}

function shuntingYardAlgorithm(expression: string) {
  const outputStack = [];
  const operatorStack = [];

  expression.split(' ').forEach((value) => {
    if (isNumber(value)) {
      outputStack.push(Number(value));
    }

    if (value === GROUP_SIGNS.LEFT) {
      operatorStack.push(value);
    }

    if (value === GROUP_SIGNS.RIGHT) {
      while (inRightLimiterCondition(operatorStack)) {
        const operator = operatorStack.pop();
        outputStack.push(operator);
      }
      if (operatorStack[operatorStack.length - 1] === GROUP_SIGNS.LEFT) {
        operatorStack.pop();
      }
    }

    if (isOperand(value)) {
      while (checkOperatorSteps(operatorStack, value)) {
        const operator = operatorStack.pop();
        outputStack.push(operator);
      }
      operatorStack.push(value);
    }
  });

  const revertedOperators = operatorStack.reverse();

  revertedOperators.forEach((operator) => outputStack.push(operator));

  return outputStack;
}

@Injectable()
export class EquationService implements IEquationSolver {
  stack = [];
  operations = [];

  constructor(private readonly operator: IOperations) {}

  orderOperations(equation: string) {
    this.operations = shuntingYardAlgorithm(equation);
  }

  executeOperations(equation: string): number {
    this.orderOperations(equation);

    let num1;
    let num2;

    this.operations.forEach((value) => {
      if (isNumber(value)) {
        this.stack.push(value);
      }

      if (isOperand(value)) {
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
