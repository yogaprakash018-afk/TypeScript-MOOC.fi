import express, { type Express, type Request, type Response } from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculate } from './calculator.ts';
import {type CalculatorVals, type ExerciseInput} from './args.ts';
import calculateExercises from './exerciseCalculator.ts';


const app : Express = express();
const port : number = 3000;

app.use(express.json());


app.get('/hello', (_req, res) => { // By giving trailing underscore we can say that we may use it later or we couldn't find reasonble way to use as of now.
    res.send('Hello Full Stack!'); // Changed from status code to just send.
});

app.get('/bmi', (req : Request, res : Response) : Response => {
    const hasBoth = ['height', 'weight'].every(prop => Object.hasOwn(req.query, prop));
    if (!hasBoth) {
        return res.status(400).json({
            error: "malformatted parameters"
        });
    };
    const {height: heightVal, weight: weightVal} = req.query;
    if (heightVal === "" || weightVal === "") {
        return res.status(400).json({
            error: "malformatted parameters"
        });
    };
    if(isNaN(Number(heightVal)) || isNaN(Number(weightVal))){
        return res.status(400).json({
            error : "malformatted parameters"
        });
    };

    const result = calculateBmi(Number(heightVal), Number(weightVal));
    return res.send({
            weight : Number(weightVal),
            height : Number(heightVal),
            bmi : result,
    });
});

// When req.query is logged it's parsed with queryParser a library by default by express that's why :
// [Object: null prototype] { height: '180', weight: '72' } - this means that req.query don't have prototype inherited from normal object like in js or ts.

app.post('/calculate', (req : Request<Record<string, never>, unknown, CalculatorVals>, res : Response) : Response => {
    // Record<string, never> means "an object type where every possible key maps to never" — which, in practice, means no keys can actually exist — genuinely enforcing "empty object," unlike {}
    // Request<Params, ResBody, ReqBody, ReqQuery>
    const {value1 : operand1, value2 : operand2, operator : operator} = req.body;
    if (isNaN(Number(operand1)) || isNaN(Number(operand2)) || typeof operator !== 'string') {
        return res.status(400).json("malformed parameters");
    };
    const output = calculate(Number(operand1), Number(operand2), operator);
    return res.status(200).json({
        value1 : operand1,
        value2 : operand2,
        operand : operator,
        result : output,
    });
});

app.post('/exercises', (req : Request<Record<string, never>, unknown, ExerciseInput>, res : Response) => {
    const { daily_exercises, target } = req.body;
    if (!daily_exercises || target === undefined || !Array.isArray(daily_exercises)) {
        return res.status(400).json({
            error: "parameters missing",
        });
    };
    if (isNaN(Number(target))){
        return res.status(400).json({
            error : "malformatted parameters",
        });
    };
    const isValidArray = daily_exercises.every((val) => !isNaN(Number(val)));
    if (!isValidArray) {
        return res.status(400).json({
            error: "malformatted parameters",
        });
    };
    const result = calculateExercises(daily_exercises, target);
    return res.status(200).json(result);
});

app.listen(port, () =>{
    console.log("Successfully Listening to port : ", port);
});

