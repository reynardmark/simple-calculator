class SimpleCalculator {
  private firstNumber: number;
  private secondNumber: number;

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
    this.firstNumber = 0;
    this.secondNumber = 0;

    this.addition = addition;
    this.subtraction = subtraction;
    this.multiplication = multiplication;
    this.division = division;
    this.exponentiation = exponentiation;
  }

  public getFirstNumber(): number {
    return this.firstNumber;
  }

  public getSecondNumber(): number {
    return this.secondNumber;
  }

  public setFirstNumber(number: number): void {
    this.firstNumber = number;
  }

  public setSecondNumber(number: number): void {
    this.secondNumber = number;
  }

  private add(): number {
    return this.addition.operate(this.firstNumber, this.secondNumber);
  }

  private substract(): number {
    return this.subtraction.operate(this.firstNumber, this.secondNumber);
  }

  private multiply(): number {
    return this.multiplication.operate(this.firstNumber, this.secondNumber);
  }

  private divide(): number {
    return this.division.operate(this.firstNumber, this.secondNumber);
  }

  private raisedTo(): number {
    return this.exponentiation.operate(this.firstNumber, this.secondNumber);
  }
}
