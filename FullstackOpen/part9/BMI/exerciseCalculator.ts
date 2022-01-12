interface ReturnValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Arguments {
  daysArray: number[];
  target: number;
}

const parseArguments2 = (args: string[]): Arguments => {
  if (args.length < 4)
    throw new Error("Not enough arguments. At least needs one day");

  const target = Number(args[2]);
  const days = args.slice(3).map((f) => Number(f));

  // Check that everything is a number
  for (let i = 0; i < days.length; i++) {
    if (isNaN(days[i])) {
      throw new Error("Provided numbers were not numbers!");
    }
  }

  return {
    daysArray: days,
    target: target,
  };
};

const calculateExercises = (
  dailyExerciseHours: Array<number>,
  target: number
): ReturnValues => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((f) => f !== 0).length;
  const rating = Math.random();
  const average =
    dailyExerciseHours.reduce((a, b) => a + b, 0) / dailyExerciseHours.length;
  const success = average >= target;

  const result = {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: "not too bad",
    target: target,
    average: average,
  };
  return result;
};

try {
  const { daysArray, target } = parseArguments2(process.argv);
  console.log(calculateExercises(daysArray, target));
} catch (error: unknown) {
  let errorMessage = "Something wrong happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

export { calculateExercises };
