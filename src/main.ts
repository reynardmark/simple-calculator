import "./style.css";
import "../src/*";

const simpleCalculator: SimpleCalculator = new SimpleCalculator(
  new Addition(),
  new Subtraction(),
  new Multiplication(),
  new Division(),
  new Exponentiation(),
);

const userInterface: CalculatorUserInterface = new CalculatorUserInterface(
  simpleCalculator,
);

userInterface.start();
