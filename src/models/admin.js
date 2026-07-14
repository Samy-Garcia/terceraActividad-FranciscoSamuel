import { Schema, model } from "mongoose"

const AdminSchema = Schema({
    name: {Type: String},
    email: {Type: String},
    password: {Type: String},
    isVerify: {Type: String},
    loginAttempts: {Type: Number},
    timeOut: {Type: Date},
},{
    timestamps: true,
    strict: false
})  

export default model("Admin", AdminSchema)