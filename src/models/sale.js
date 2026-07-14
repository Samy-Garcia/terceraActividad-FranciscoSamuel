import mongoose, { Schema, model } from "mongoose"

const saleSchema = Schema({
    customerId: {type: mongoose.Types.ObjectId,
        ref: "Customer"
    },
    quantity: {type: Number},
    purchaseDate: {type: Date},
    total: {type: Number},
    paymentStatus: {type: Boolean},
    transactionId: {type: String},
},{
    timestamps: true,
    strict: false
})  

export default model("Sale", saleSchema)