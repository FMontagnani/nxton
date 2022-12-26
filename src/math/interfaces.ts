export abstract class IOperations {
  abstract add(num1: number, num2: number): number;
  abstract subtract(num1: number, num2: number): number;
  abstract multiply(num1: number, num2: number): number;
  abstract divide(num1: number, num2: number): number;
}

export abstract class IEquationSolver {
  abstract orderOperations(equation: string): void;
  abstract executeOperations(equation: string): number;
}
