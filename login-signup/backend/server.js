import express from 'express';
import cors from 'cors';
import { config } from './config/config.js';
import session from 'express-session';
import nodemailer from 'nodemailer';

const app = express();
const PORT = 5000;
app.use(cors({
  origin: 'http://localhost:5173', // Your React app URL
  credentials: true, // Allow cookies to be sent
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 } // Set to true if using HTTPS
}));

app.use(express.json());

app.post('/login', async(req, res) => {
    const loginData = req.body.email;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Login data received:', loginData);
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: config.gmail,
            pass: config.app_password, // Gmail App password
        },
    });

    const mailOptions = {
        from: config.gmail,
        to: loginData,
        subject: "Login OTP",
        text: `Your OTP is ${otp} `, // In real application, generate a random OTP
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log("OTP sent successfully");
        res.json({ success: true, message: "OTP sent successfully!",otp: otp });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error sending email" });
    }

});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log('✅ Test the server: http://localhost:5000/api/test');
  console.log('✅ Session middleware enabled');
});