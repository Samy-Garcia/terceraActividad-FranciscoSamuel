import { Schema, model } from "mongoose"

const customerSchema = Schema({
    name: {Type: String},
    email: {Type: String},
    password: {Type: String},
    isVerify: {Type: String},
    loginAttemps: {Type: Number},
    timeOut: {Type: Date},
},{
    timestamps: true,
    strict: false
})  

export default model("Customer", customerSchema)