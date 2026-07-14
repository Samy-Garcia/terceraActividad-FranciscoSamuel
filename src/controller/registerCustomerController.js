import customerModel from "../models/customer.js";
import nodemailer from "nodemailer";
import crypto, { randomBytes } from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptsj from "bcryptjs"

import { config } from "../../config.js";

const registerCustomerController = {}

registerCustomerController.register = async (req, res) =>{
    try {
        //solicitar datos
        let {name, email, password, isVerify, loginAttemps, timeOut} = req.body

        const existCustomer = await customerModel.findOne({ email });
        if (existCustomer) {
            return res.status(400).json({message: "cliente ya exite"})
        }

        //encriptar la contraseña
        const passwordHashed = await bcryptsj.hash(password, 10);

        //generar codigo aleatorio
        const randomCode = crypto.randomBytes(3).toString("hex");

        //guardar todo en un token
        const token = jsonwebtoken.sign({
            randomCode,
            name,
            email,
            password: passwordHashed,
            isVerify,
            loginAttemps,
            timeOut
        },
        //Secret key
        config.JWT.secret,
        //Tiempo de expiracion
        {expiresIn: "15m"}


    );

    //guardar el token en una cookie
    res.cookie("registrationCookie", token, {maxAge: 15*60*1000})
    //enviar el correo
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: config.email.user_email,
            pass: config.email.user_password,
        }
    });

    //quie y como lo recibe
    const mailOptions = {
        from: config.email.user_email,
        to: email,
        subject: "verificar cuenta",
        text: "para verificar su cuente ponga su codigo " + randomCode + " valido por 15 minutos"
    };

    //enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error")
            return res.status(500).json({message: "error send mail"})
        }
    })
    } catch (error) {
        
    }
}