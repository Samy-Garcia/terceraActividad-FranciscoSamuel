import adminModel from "../models/admin.js";
import nodemailer from "nodemailer";
import crypto, { randomBytes } from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptsj from "bcryptjs"

import { config } from "../../config.js";

const registerAdminController = {}

registerAdminController.register = async (req, res) =>{
    try {
        //solicitar datos
        let {name, email, password, isVerify, loginAttemps, timeOut} = req.body

        const existAdmin = await adminModel.findOne({ email });
        if (existAdmin) {
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
            console.log("error"+ error)
            return res.status(500).json({message: "error send mail"})
        }
        return res.status(200).json({message:"email send succesfully"})
    })
    } catch (error) {
        console.log("error"+ error)
        res.status(500).json({message: "internal server error"})
        
    }
}

registerAdminController.verifyCode = async (req, res) => {
    try {
        const { verifyCodeRequest } = req.body;

        const token = req.cookies.registrationCookie

        const decoded = jsonwebtoken.verify(token, config.JWT.secret);
        const {
            randomCode: storedCode,
            name,
            email,
            password,
            isVerify,
            loginAttemps,
            timeOut

        } = decoded

        if (verifyCodeRequest !== storedCode) {
            return res.status(400).json({message: "invalid code"})
        }

        const newAdmin = new adminModel({
            name,
            email,
            password,
            isVerify: true
        })
        await newAdmin.save();
        
        res.clearCookie("registrationCookie");

        return res.status(200).json({message:"admin register succesfully"})



    } catch (error) {
        console.log("error"+ error)
        res.status(500).json({message: "internal server error"})
    }
}
export default registerAdminController;