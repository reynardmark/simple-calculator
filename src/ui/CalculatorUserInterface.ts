import { SimpleCalculator } from "src/logic/index";
import { EntryPad } from "src/domain";
export default class CalculatorUserInterface {
  private calculator: SimpleCalculator;
  private entryPad: EntryPad;
  private topDisplay: HTMLElement;
  private bottomDisplay: HTMLElement;

  //put all important HTML elements here such as top and bottom display

  constructor(
    entryPad: EntryPad,
    calculator: SimpleCalculator,
    topDisplay: HTMLElement,
    bottomDisplay: HTMLElement,
  ) {
    this.entryPad = entryPad;
    this.calculator = calculator;

    this.topDisplay = topDisplay;
    this.bottomDisplay = bottomDisplay;
  }

  start() {
    this.equalsEvent();
    this.limitToOneOperation();
    this.clearBottomDisplayEvent();
    this.clearDisplayEvent();
    this.clearPreviousCharEvent();
    this.reflectKeyValueToDisplayEvent();
  }

  private preventOperationKeysToShow() {
    //when input is empty
    if (!this.topDisplay.textContent) {
    }
  }

  private limitToOneOperation() {
    //stop repeating text operation

    const keysToReflect = document.querySelectorAll(".reflect-key");

    // keysToReflect.forEach((v) => {
    //   v.addEventListener("click", (_e) => {
    //     console.log(/[+,-,x,÷,^]{1}/.test(this.topDisplay?.textContent ?? ""));
    //     if (/[+,-,x,÷,^]{2}/.test(this.topDisplay?.textContent ?? "")) {
    //       this.topDisplay.textContent =
    //         this.topDisplay?.textContent?.slice(0, -1) ?? "";
    //     }
    //   });
    // });

    //observer??
    // const observer = new MutationObserver(([topDisplayElement], _observer) => {
    //   if (/[+,-,x,÷,^]{1}/.test(topDisplayElement.target.textContent ?? "")) {
    //     console.log(topDisplayElement.target.textContent);
    //     //replace the operation (?)
    //   }
    // });

    // observer.observe(this.topDisplay, { childList: true });
  }

  private getResult(): number {
    const firstNumber = this.entryPad.getFirstNumber();
    const secondNumber = this.entryPad.getSecondNumber();

    console.log(this.entryPad.getOperation());

    switch (this.entryPad.getOperation()) {
      case "+":
        return this.calculator.add(firstNumber, secondNumber);
      case "-":
        return this.calculator.subtract(firstNumber, secondNumber);
      case "x":
        return this.calculator.multiply(firstNumber, secondNumber);
      case "÷":
        return this.calculator.divide(firstNumber, secondNumber);
      case "^":
        return this.calculator.raisedTo(firstNumber, secondNumber);
      default:
        return 0;
    }
  }

  private printResult() {
    const result = this.getResult();

    this.bottomDisplay.textContent = String(result);

    this.entryPad.setFirstNumber(result);
    this.entryPad.setSecondNumber(0);
  }

  private equalsEvent() {
    const equals = document.querySelector("[data-logic='equals']");

    equals?.addEventListener("click", (_) => {
      const [firstNumber, secondNumber] = this.topDisplay.textContent
        ?.split(/[+,\-\,x,÷,^]/)
        .map((v) => Number(v)) as number[];

      if (!secondNumber) {
        return;
      }

      const operationIndex = String(firstNumber).split("").length;
      const operation = this.topDisplay.textContent![
        operationIndex
      ] as MathSymbol;

      this.entryPad.setOperation(operation);
      this.entryPad.setFirstNumber(firstNumber);
      this.entryPad.setSecondNumber(secondNumber);

      this.printResult();
    });
  }

  private clearBottomDisplayEvent() {
    const keysToReflect = document.querySelectorAll(".reflect-key");

    keysToReflect.forEach((v) => {
      v.addEventListener("click", (_e) => {
        this.bottomToTopDisplay();
        this.bottomDisplay.textContent = "";
      });
    });
  }

  private bottomToTopDisplay() {
    if (this.bottomDisplay.textContent) {
      this.topDisplay.textContent = this.bottomDisplay.textContent;
    }
  }

  private clearDisplayEvent() {
    const clearKey = document.querySelector("[data-logic='clear']");

    clearKey?.addEventListener("click", (_e) => {
      this.bottomDisplay.textContent = "";
      this.topDisplay.textContent = "";
    });
  }

  private clearPreviousCharEvent() {
    const backspaceKey = document.querySelector("[data-logic='backspace']");

    backspaceKey?.addEventListener("click", (_e) => {
      this.topDisplay.textContent =
        this.topDisplay.textContent?.slice(0, -1) ?? "";
    });
  }

  private reflectKeyValueToDisplayEvent() {
    const keysToReflect = document.querySelectorAll(".reflect-key");

    keysToReflect.forEach((v) => {
      v.addEventListener("click", (e) => {
        const textToDisplay = (e.target as HTMLElement).textContent ?? "";
        this.topDisplay.textContent =
          this.topDisplay.textContent + textToDisplay;
      });
    });
  }
}
