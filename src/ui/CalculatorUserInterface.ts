import { SimpleCalculator } from "src/logic/index";
import { EntryPad } from "src/domain";
import EventHandler from "./EventHandler";

export default class CalculatorUserInterface {
  private calculator: SimpleCalculator;
  private entryPad: EntryPad;
  private eventHandler: EventHandler;

  constructor(
    entryPad: EntryPad,
    calculator: SimpleCalculator,
    eventHandler: EventHandler,
  ) {
    this.entryPad = entryPad;
    this.calculator = calculator;
    this.eventHandler = eventHandler;
  }

  start() {
    //start calcu
    this.inputNumbersAndOperations();
    this.limitToOneOperation();
    this.eventHandler.run();
  }

  private limitToOneOperation() {
    const topDisplay = document.querySelector("#top");

    const regexOne = new RegExp("([0-9]){1,8}([+]*)([0-9]){1,8}");
    if (!topDisplay?.textContent?.match(regexOne) && topDisplay?.textContent) {
      console.log("ERROR");
    }
  }

  private getResult(): number {
    const firstNumber = this.entryPad.getFirstNumber();
    const secondNumber = this.entryPad.getSecondNumber();

    switch (this.entryPad.getOperation()) {
      case "+":
        return this.calculator.add(firstNumber, secondNumber);
      case "-":
        return this.calculator.subtract(firstNumber, secondNumber);
      case "x":
        return this.calculator.multiply(firstNumber, secondNumber);
      case "÷":
        return this.calculator.multiply(firstNumber, secondNumber);
      case "^":
        return this.calculator.raisedTo(firstNumber, secondNumber);
      default:
        return 0;
    }
  }

  private printResult() {
    const bottomDisplay = document.querySelector("#bottom") as HTMLElement;

    bottomDisplay.textContent = String(this.getResult());
  }

  private inputNumbersAndOperations() {
    //pag na press yung equals, don ka palang magsplit ng string
    //then setfirstnumber, set second number, calculate thru simple calculator
    const equals = document.querySelector("[data-logic='equals']");
    const topDisplay = document.querySelector("#top") as HTMLElement;

    equals?.addEventListener("click", (_) => {
      const [firstNumber, secondNumber] = topDisplay.textContent
        ?.split(/[+,-,x,÷,^]/)
        .map((v) => Number(v)) as number[];

      if (!secondNumber) {
        return;
      }

      const operationIndex = String(firstNumber).split("").length;
      const operation = topDisplay.textContent![operationIndex] as MathSymbol;

      this.entryPad.setOperation(operation);
      this.entryPad.setFirstNumber(firstNumber);
      this.entryPad.setSecondNumber(secondNumber);

      this.printResult();

      //pag second + na, equate mo na agad tapos set firstNumber ung result
    });
  }

  private clearOneChar() {}

  // private observeTopDisplayChange() {
  //   const topDisplay = document.querySelector("#top")!;

  //   const changeTextObserver = new MutationObserver(([e], _observer) => {
  //     console.log(e.target.textContent);

  //   });

  //   changeTextObserver.observe(topDisplay, { childList: true });
  // }

  private addResult() {
    this.calculator.add(
      this.entryPad.getFirstNumber(),
      this.entryPad.getSecondNumber(),
    );
  }
}
