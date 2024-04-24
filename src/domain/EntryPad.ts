export default class EntryPad {
  private firstNum: number;
  private secondNum: number;
  private operation: MathSymbol;

  constructor() {
    this.firstNum = 0;
    this.secondNum = 0;
    this.operation = "";
  }

  public getFirstNumber() {
    return this.firstNum;
  }

  public getSecondNumber() {
    return this.secondNum;
  }

  public getOperation() {
    return this.operation;
  }

  public setFirstNumber(num: number) {
    this.firstNum = num;
  }

  public setSecondNumber(num: number) {
    this.secondNum = num;
  }

  public setOperation(operation: MathSymbol) {
    this.operation = operation;
  }
}
