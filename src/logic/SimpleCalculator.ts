export default class SimpleCalculator {
  private addition: Operation;
  private subtraction: Operation;
  private multiplication: Operation;
  private division: Operation;
  private exponentiation: Operation;

  constructor(
    addition: Operation,
    subtraction: Operation,
    multiplication: Operation,
    division: Operation,
    exponentiation: Operation,
  ) {
    this.addition = addition;
    this.subtraction = subtraction;
    this.multiplication = multiplication;
    this.division = division;
    this.exponentiation = exponentiation;
  }

  public add(firstNum: number, secondNum: number): number {
    return this.addition.calculate(firstNum, secondNum);
  }

  public subtract(firstNum: number, secondNum: number): number {
    return this.subtraction.calculate(firstNum, secondNum);
  }

  public multiply(firstNum: number, secondNum: number): number {
    return this.multiplication.calculate(firstNum, secondNum);
  }

  public divide(firstNum: number, secondNum: number): number {
    return this.division.calculate(firstNum, secondNum);
  }

  public raisedTo(firstNum: number, secondNum: number): number {
    return this.exponentiation.calculate(firstNum, secondNum);
  }
}
