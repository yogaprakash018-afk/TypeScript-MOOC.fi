export interface BmiValues {
    value1 : number,
    value2 : number
};

export interface ExerciseInput {
    target: number;
    daily_exercises: number[];
};

export interface CalculatorVals {
    value1 : number,
    value2 : number,
    operator : string,
};

const argsVals = (array : string[]) : BmiValues | ExerciseInput | CalculatorVals=>  {
    if(array.length < 4) throw new Error("Only Three arguments have passed");

    let result: BmiValues | ExerciseInput | CalculatorVals; // This AI gave for me.
    const newTarget = array[2];
    const newArr: number[] = [];

    switch(array.length){
        case 4:
            if(isNaN(Number(array[2])) || isNaN(Number(array[3]))){
                throw new Error("Any one of bmi input is undefined or not a number");
            };
            result = {
                value1 : Number(array[2]),
                value2 : Number(array[3]),
            };
            break;
        case 5:
            if(isNaN(Number(array[2])) || isNaN(Number(array[3])) || typeof(array[4]) !== 'string'){
                throw new Error("Any one of three inputs for calculate is undefined or not a number");
            };
            result = {
                value1 : Number(array[2]),
                value2 : Number(array[3]),
                operator : array[4],
            };
            break;
        default:
        for (let i = 3; i < array.length; i++) {
            if (!isNaN(Number(array[i]))) {
                newArr.push(Number(array[i]));
            } else {
                throw new Error("Some value might be not present or could not be a number");
            }
        };
        result = { target: Number(newTarget), daily_exercises: newArr };   // ← build the FULL object at once, THEN assign
        break;
    };
    return result;
};

export default argsVals;

if (process.argv[1] === import.meta.filename) { 
    try {
        // console.log(process.argv);
        const result : BmiValues | ExerciseInput | CalculatorVals = argsVals(process.argv);
        console.log(result);
    }catch(error : unknown) {
        let errorMessage = "Something wrong in the arguments passed in terminal ";
        if (error instanceof Error) {
            errorMessage += error.message;
            console.log(errorMessage);
        };
    };
};
