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
import { CalculatorUserInterface, EventHandler } from "./ui";

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
  new EventHandler(),
);

userInterface.start();
