import argsVals, {type ExerciseInput} from "./args.ts";

interface Exercise {
    periodLength : number,
    trainingDays : number,
    target: number,
    success : boolean,
    average : number,
    rating : number,
    ratingDescription : string,

};

interface Description {
    rating : number,
    ratingDescription : string,
};


function calculateExercises(incomingArr : number[], target : number) : Exercise {
    const count : number = incomingArr.reduce((count, arrVal) => arrVal > 0 ?  count + 1 : count, 0); // or filter usage trainingDays: incomingArr.filter(day => day > 0).length gave by AI when i asked it whether i coded correctly.
    const sumVal : number = incomingArr.reduce((sum, arrVal) => sum + arrVal, 0);
    const average : number = sumVal/incomingArr.length;
    const getRatingDetails = (average: number, target: number) : Description => {
        if (average >= target) {
            return { rating: 3, ratingDescription: 'great job, target reached!' };
        } else if (average >= target * 0.75) {
            return { rating: 2, ratingDescription: 'not too bad but could be better' };
        } else {
            return { rating: 1, ratingDescription: 'bad, you need to put in more effort' };
        }
    }; // this if else was given By AI as i tried to do ternary based if and recommeded me the standerd if else.
    const {rating, ratingDescription} = getRatingDetails(average, target);

    return {
        periodLength : incomingArr.length,
        trainingDays : count, 
        target: target,
        success : average >= target,
        average : average,
        rating : rating,
        ratingDescription : ratingDescription,
    };
};

if (process.argv[1] === import.meta.filename) {
    try{
        const result = argsVals(process.argv);
        const {target, daily_exercises} = result as ExerciseInput;
        const output  : Exercise = calculateExercises(daily_exercises, target);
        console.log(output);
    }catch(error : unknown){
        let errorMessage = "Something wrong in the arguments passed in terminal ";
        if(error instanceof Error) {
            errorMessage += error.message;
            console.log(errorMessage);
        };
    };
};
export default calculateExercises;


