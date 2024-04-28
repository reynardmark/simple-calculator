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
    this.clearBottomDisplayEvent();
    this.clearDisplayEvent();
    this.clearPreviousCharEvent();
    this.reflectKeyValueToDisplayEvent();
    this.replaceNumberIfEmptyTopDisplayEvent();
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
      this.topDisplay.textContent = "0";
    });
  }

  private clearPreviousCharEvent() {
    const backspaceKey = document.querySelector("[data-logic='backspace']");

    backspaceKey?.addEventListener("click", (_e) => {
      if (this.topDisplay.textContent !== "0") {
        this.topDisplay.textContent =
          this.topDisplay.textContent?.slice(0, -1) ?? "";
      }
    });
  }

  private reflectKeyValueToDisplayEvent() {
    const operations = document.querySelectorAll("[data-logic='operation']");
    const numbers = document.querySelectorAll("[data-logic='number']");
    const point = document.querySelector("[data-logic='point']");

    //for numbers
    numbers.forEach((v) => {
      v.addEventListener("click", (e) => {
        const textToDisplay = (e.target as HTMLElement).textContent ?? "";

        if (this.topDisplay.textContent !== "0") {
          this.topDisplay.textContent =
            this.topDisplay.textContent + textToDisplay;
        }
      });
    });

    operations.forEach((v) => {
      v.addEventListener("click", (e) => {
        const textToDisplay = (e.target as HTMLElement).textContent ?? "";
        const topDisplayLastChar = this.topDisplay.textContent?.slice(-1) ?? "";

        //checks for last char
        if (/[+,\-\,x,÷,^]/.test(topDisplayLastChar)) {
          const textToRemain = this.topDisplay.textContent?.slice(0, -1);
          this.topDisplay.textContent = textToRemain + textToDisplay;
          return;
        }

        if (topDisplayLastChar === ".") {
          return;
        }

        //occurences
        if (
          (
            this.topDisplay.textContent?.match(
              /[0-9]{1,}[+,\-\,x,÷,^]{1}[0-9]{1,}/,
            ) ?? []
          ).length > 0
        ) {
          return;
        }

        //reflect on display
        if (this.topDisplay.textContent !== "0") {
          this.topDisplay.textContent =
            this.topDisplay.textContent + textToDisplay;
        }
      });
    });

    point?.addEventListener("click", (e) => {
      const POINT_PATTERN = /[0-9]{1,}[.]{1}[0-9]{1,}/;

      const textToDisplay = (e.target as HTMLElement).textContent ?? "";
      const topDisplayLastChar = this.topDisplay.textContent?.slice(-1) ?? "";
      const topDisplayContent =
        this.topDisplay.textContent?.split(/[+,\-\,x,÷,^]/) ?? [];

      //check last char
      if (topDisplayLastChar === ".") {
        return;
      }

      //occurrence

      if (topDisplayContent[0].match(POINT_PATTERN) ?? [].length > 0) {
        if (!topDisplayContent[1]) {
          return;
        } else {
          if (topDisplayContent[1].match(POINT_PATTERN) ?? [].length > 0) {
            return;
          }
        }
      }

      this.topDisplay.textContent = this.topDisplay.textContent + textToDisplay;
    });

    //for decimal point - TODO: check for occurrences and if last char so no duplication

    //     //kapag nagtype ka tapos ang last char is Mathsymbols, replace lang nang replace
    //     //replace lang kapag pinindot yung + - / * ^ pati decimal point

    //     //if nasa last char, replace lang last string (kapag ang pinindot is operations or decimal)

    //     //if hindi last char, wag iinput (for operations)
    //     //if hindi last char, split yung array with + - / * ^, then check if may decimal na
  }

  private replaceNumberIfEmptyTopDisplayEvent() {
    const numberBtns = document.querySelectorAll("[data-logic='number']");

    numberBtns.forEach((v) => {
      v.addEventListener("click", (e) => {
        if (this.topDisplay.textContent === "0") {
          this.topDisplay.textContent = this.topDisplay.textContent.replace(
            "0",
            (e.target as HTMLElement).textContent ?? "",
          );
        }
      });
    });
  }
}
