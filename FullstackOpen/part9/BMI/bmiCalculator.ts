const calculateBmi = (height: number, mass: number) => {
  if (height === 0) throw new Error("can't divide by zero");
  const heightInMeters = height / 100
  const bmi = mass / (heightInMeters)**2;
  console.log(bmi)

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
  }
};

console.log(calculateBmi(180, 74));
