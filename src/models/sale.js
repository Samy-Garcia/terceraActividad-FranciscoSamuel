import mongoose, { Schema, model } from "mongoose"

const saleSchema = Schema({
    customerId: {Type: mongoose.Types.ObjectId,
        ref: "Customer"
    },
    quantity: {Type: Number},
    purchaseDate: {Type: Date},
    total: {Type: Number},
    paymentStatus: {Type: Boolean},
    transactionId: {Type: String},
},{
    timestamps: true,
    strict: false
})  

export default model("Sale", saleSchema)