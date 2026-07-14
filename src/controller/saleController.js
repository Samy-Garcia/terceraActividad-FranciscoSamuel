import saleModel from "../models/sale.js";

const saleController = {};

// Obtener todas las ventas (Solo Admin)
saleController.getSales = async (req, res) => {
    try {
        const sales = await saleModel.find().populate("customerId", "name email");
        res.json(sales);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener las ventas" });
    }
};

// Obtener una venta por ID
saleController.getSale = async (req, res) => {
    try {
        const sale = await saleModel.findById(req.params.id).populate("customerId", "name email");

        if (!sale) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }

        res.json(sale);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener la venta" });
    }
};

// Registrar una venta (Cliente)
saleController.createSale = async (req, res) => {
    try {
        const {
            customerId,
            quantity,
            purchaseDate,
            total,
            paymentStatus,
            transactionId
        } = req.body;

        const newSale = new saleModel({
            customerId,
            quantity,
            purchaseDate,
            total,
            paymentStatus,
            transactionId
        });

        await newSale.save();

        res.status(201).json({
            message: "Compra registrada correctamente",
            sale: newSale
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al registrar la compra" });
    }
};

// Actualizar una venta
saleController.updateSale = async (req, res) => {
    try {
        const updatedSale = await saleModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedSale) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }

        res.json({
            message: "Venta actualizada correctamente",
            sale: updatedSale
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al actualizar la venta" });
    }
};

// Eliminar una venta
saleController.deleteSale = async (req, res) => {
    try {
        const deletedSale = await saleModel.findByIdAndDelete(req.params.id);

        if (!deletedSale) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }

        res.json({ message: "Venta eliminada correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al eliminar la venta" });
    }
};

export default saleController;