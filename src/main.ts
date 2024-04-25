import "./style.css";
import {
  Addition,
  Subtraction,
  Multiplication,
  Division,
  Exponentiation,
  SimpleCalculator,
} from "./logic/index";
import { EntryPad } from "./domain";
import { CalculatorUserInterface } from "./ui";

const topDisplay = document.querySelector("#top") as HTMLElement;
const bottomDisplay = document.querySelector("#bottom") as HTMLElement;

const simpleCalculator: SimpleCalculator = new SimpleCalculator(
  new Addition(),
  new Subtraction(),
  new Multiplication(),
  new Division(),
  new Exponentiation(),
);

const userInterface: CalculatorUserInterface = new CalculatorUserInterface(
  new EntryPad(),
  simpleCalculator,
  topDisplay,
  bottomDisplay,
);

userInterface.start();
