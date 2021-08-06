import { Car } from "./models/data-model.js";

Car.find({}, (err, result) =>{
    if (err) {
        console.log(err);
    } else {
        console.log(result);
    }
    return;
});

console.log("Step1");
Car.countDocuments((err, result) => {
    console.log("step2");
    console.log(result + " db entries");
});
console.log("step3");