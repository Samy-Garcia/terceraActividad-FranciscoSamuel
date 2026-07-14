import { Schema, model } from "mongoose"

const AdminSchema = Schema({
    name: { type: String },
    email: {type: String},
    password: {type: String},
    isVerify: {type: Boolean},
    loginAttempts: {type: Number},
    timeOut: {type: Date},
},{
    timestamps: true,
    strict: false
})  

export default model("Admin", AdminSchema)