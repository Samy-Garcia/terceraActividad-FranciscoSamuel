import { Schema, model } from "mongoose"

const customerSchema = Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
    isVerify: {type: String},
    loginAttemps: {type: Number},
    timeOut: {type: Date},
},{
    timestamps: true,
    strict: false
})  

export default model("Customer", customerSchema)