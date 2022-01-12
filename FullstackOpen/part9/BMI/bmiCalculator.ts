interface Values {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): Values => {
  if (args.length < 4) throw new Error("Not enough arguments.");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided numbers were not numbers!");
  }
};

const calculateBmi = (height: number, mass: number) => {
  if (height === 0) throw new Error("can't divide by zero");
  const heightInMeters = height / 100;
  const bmi = mass / heightInMeters ** 2;

  if (bmi < 16) {
    return "Underweight (Severe thinness) ";
  } else if (16 <= bmi && bmi <= 16.9) {
    return "Underweight (Moderate thinness)";
  } else if (17 <= bmi && bmi <= 18.4) {
    return "Underweight (Mild thinness) ";
  } else if (18.5 <= bmi && bmi <= 24.9) {
    return "Normal range";
  } else if (25 <= bmi && bmi <= 29.9) {
    return "Overweight (Pre-obese)";
  } else if (30 <= bmi && bmi <= 34.9) {
    return "Obese (Class I)";
  } else if (35 <= bmi && bmi <= 39.9) {
    return "Obese (Class II)";
  } else if (bmi >= 40) {
    return "Obese (Class III)";
  } else {
    return "Something wrong";
  }
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  const height = value1;
  const mass = value2;
  console.log(calculateBmi(height, mass));
} catch (error: unknown) {
  let errorMessage = "Something wrong occurred.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

export { calculateBmi };
