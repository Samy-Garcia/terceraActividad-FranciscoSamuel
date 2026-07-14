import { Router } from "express";
import saleController from "../controller/saleController.js";

import { validateAuthCookie } from "../middleware/authMiddleware.js";

const router = Router();

// Cliente y Admin pueden consultar una compra por ID
router.get(
    "/:id",
    validateAuthCookie(["customer", "admin"]),
    saleController.getSale
);

// Solo Admin puede consultar todas las compras
router.get(
    "/",
    validateAuthCookie(["admin"]),
    saleController.getSales
);

// Solo Cliente puede registrar una compra
router.post(
    "/",
    validateAuthCookie(["customer"]),
    saleController.createSale
);

// Admin puede actualizar una compra
router.put(
    "/:id",
    validateAuthCookie(["admin"]),
    saleController.updateSale
);

// Solo Admin puede eliminar una compra
router.delete(
    "/:id",
    validateAuthCookie(["admin"]),
    saleController.deleteSale
);

export default router;