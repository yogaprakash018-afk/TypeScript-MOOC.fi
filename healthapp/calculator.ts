import argsVals from "./args.ts";
import  {type CalculatorVals } from "./args.ts";

export function calculate(value1 : number, value2 : number , op : string) : number{
    switch(op){
        case "add":
            return value1 + value2;
        case "multiply":
            return value1 * value2;
        case "divide":
            if (value2 === 0) {
                throw new Error("Cannot divide by 0.");
            };
            return value1 / value2;
        default :
            throw new Error("The operator must be string and properly spelled.");
    };
};

if (process.argv[1] === import.meta.filename) {
    try{
        const argsInput = argsVals(process.argv) as CalculatorVals;
        console.log(argsInput);
        const {value1, value2, operator} = argsInput;
        const result= calculate(value1, value2, operator);
        console.log(result);
    } catch (error : unknown){
        let errorMessage = "Something wrong in the arguments passed in terminal ";
        if (error instanceof Error){
            errorMessage += error.message;
            console.log(errorMessage);
        };
    };
};
