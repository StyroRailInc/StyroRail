// Constants
import { Constants } from "@/constants";

const parseInput = (text: string, isfeet: boolean): number => {
  const isNotZero = (total: number) => {
    if (total) {
      return total;
    } else {
      throw new Error("0 is not a valid Input");
    }
  };

  const parseFeetInchesNotation = (notation: string): number => {
    const matches = notation.split("-");
    let total: number;

    if (matches.length === 2) {
      const feet = parseInt(matches[0]);
      const inches = parseFloat(matches[1].replace('"', ""));
      total = feet * Constants.N_INCHES_IN_FOOT + inches;
      return isNotZero(total);
    }

    if (notation.includes(`'`) && notation.includes(`"`)) {
      const matches = notation.split("'");
      total = parseInt(matches[0]) * Constants.N_INCHES_IN_FOOT + parseInt(matches[1]);
      return isNotZero(total);
    } else if (notation.includes(`'`)) {
      total = parseInt(notation) * Constants.N_INCHES_IN_FOOT;
      return isNotZero(total);
    } else if (notation.includes(`"`)) {
      total = parseInt(notation);
      return isNotZero(total);
    }
    total = isfeet ? parseInt(notation) * Constants.N_INCHES_IN_FOOT : parseInt(notation);
    return isNotZero(total);
  };

  if (
    /^(\d+)-(\d+)"$/.test(text) || // matches 10-10"
    /^(\d+)-(\d+)$/.test(text) || // matches 10-10
    /^(\d+)'-?(\d+)"$/.test(text) || // matches 10'-10"
    /^(\d+)'-?(\d+)$/.test(text) || // matches 10'-10
    /^\d+$/.test(text) || // matches 10
    /^(\d+)'/.test(text) || // matches 10'
    /^(\d+)"/.test(text) || // matches 10"
    /^(\d+)'?(\d+)"$/.test(text) // matches 10'10"
  ) {
    return parseFeetInchesNotation(text);
  } else {
    throw new Error("Invalid Input");
  }
};

const inchesToFeet = (inches: number): string => {
  inches = Math.round(inches);
  const feet: number = Math.floor(inches / Constants.N_INCHES_IN_FOOT);
  const remainder: number = inches % Constants.N_INCHES_IN_FOOT;
  return `${feet != 0 ? feet : ""}${feet != 0 ? `'` : ""}${remainder ? remainder : ""}${
    remainder ? '"' : ""
  }`;
};

const parseIntegerInput = (input: string): number => {
  // Trim any leading or trailing whitespace
  const trimmedInput = input.trim();

  if (trimmedInput !== "") {
    if (isNaN(Number(trimmedInput))) {
      throw new Error("Input is not a valid number");
    }
  } else {
    return 0;
  }

  const parsed = parseInt(trimmedInput);

  // Check if parsing resulted in NaN or if input had non-integer values
  if (parsed.toString() !== trimmedInput) {
    throw new Error("Input is not a valid integer");
  }

  return parsed;
};

export { parseInput, inchesToFeet, parseIntegerInput };
