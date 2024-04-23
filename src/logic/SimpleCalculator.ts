class SimpleCalculator {
  private firstNumber: number;
  private secondNumber: number;

  private addition: Operation;
  
  constructor(addition: Operation,
    subtraction: Operation, multiplication: Operation, division: Operation) {
    this.firstNumber = 0;
    this.secondNumber = 0;
    this.addition = addition;
  }

  private add(): number {
    return this.addition.operate(this.firstNumber, this.secondNumber);
  }  
}