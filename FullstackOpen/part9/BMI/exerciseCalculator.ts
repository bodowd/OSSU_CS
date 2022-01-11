interface ReturnValues {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number,

}
const calculateExercises = (dailyExerciseHours: Array<number>, target: number): ReturnValues => {
    const periodLength = dailyExerciseHours.length
    const trainingDays = dailyExerciseHours.filter(f => f !== 0).length
    const rating = Math.random()
    const average = dailyExerciseHours.reduce((a,b) => a + b, 0) / dailyExerciseHours.length
    const success = average >= target

    const result = {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: 'not too bad',
        target: target,
        average: average
    }
    return result
}


console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))