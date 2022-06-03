import mongoose from "mongoose";

//create schema
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 18, max: 30 },
    fees: { type: mongoose.Decimal128, required: true} //, validate: (value) => value >= 5000.5 }
});

const userSchema = new mongoose.Schema({
    name: { type: String, trim: true},
    email: { type: String, unique:true},
    mobile: { type: String, unique:true},
    password: { type: String, trim: true }
})

// model
const StudentModel = mongoose.model("student", studentSchema)
const UserModel = mongoose.model("user", userSchema)
const dataset = {StudentModel,UserModel}
//export
export default dataset

// module.exports = {StudentModel, UserModel }

