import argsVals, {type BmiValues} from "./args.ts";

const bmiRanges = [
  { max : 18.5, status : 'Underweight (unhealthy weight)' },
  { max : 25.0, status : 'Normal range' },
  { max : 30.0, status : 'Overweight (unhealthy weight)' },
  { max : 34.9, status : 'Class 1 Obesity'},
  { max : 39.9, status : 'Class 2 Obesity'},
  { max : 40.0, status : 'Class 3 Obesity (Severe)'}

]; // This array of objects was created by the AI when i asked how to map instead of hardcoded if else.


export function calculateBmi(num1 : number, num2 : number) : string { // num1 - height, num2 - weight.
    if (typeof(num1) !== 'number' || typeof(num2) !== 'number'){
      throw new Error("Any one of inputs is not a number, please provide valid details.");
    };

    if (num1 < num2) throw new Error(`Please provide valid details — ${num1} and ${num2} don't look properly structured. Give height first (in cm), then weight (in kg).`);
    const bmiVal = num2 / (num1 / 100) ** 2;
    const range = bmiRanges.find(bmi => bmiVal < bmi.max);
    return range ? range.status : `Your height or weight is in an undefined range, as all ranges are for average heights.`;
};

if (process.argv[1] === import.meta.filename) {
  try{
  
    const result = argsVals(process.argv);
    const inputs = result as BmiValues;
    const output : string = calculateBmi(inputs.value1, inputs.value2);
    console.log(output);
  }catch(error : unknown){
    let errorMessage = "Something wrong in the arguments passed in terminal ";
    if (error instanceof Error){
      errorMessage += error.message;
      console.log(errorMessage);
    };
  };
};
