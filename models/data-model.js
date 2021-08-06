import mongoose from 'mongoose';
const { Schema } = mongoose;
import { connectionString } from "../connectionString.js";

// For security, connectionString should be in a separate file and excluded from git

mongoose.connect(connectionString, {
    dbName: 'IT122db',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const carSchema = new Schema({
    model: {type: String, required: true},
    type: String,
    year: Number,
    make: String,
    color: String,
    capacity: Number,
    horsepower: Number
});

export const Car = mongoose.model('Car', carSchema, 'IT122coll');