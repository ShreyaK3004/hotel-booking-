import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import clerkwebhooks from './controllers/clerkwebhooks.js';

connectDB()

const app=express()
app.use(cors()) // Enable Cross-origin resource sharing

//Middleware
app.use(express.json())
app.use(clerkMiddleware())

app.use("/api/clerk" , clerkwebhooks)

app.get('/', (req,res)=> res.send("API is Working"))

const PORT =process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));