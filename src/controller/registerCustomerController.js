import customerModel from "../models/customer.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptsj from "bcryptjs"

import { config } from "../../config.js";

const registerCustomerController = {}

registerCustomerController