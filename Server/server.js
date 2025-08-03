import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import clerkwebhooks from './controllers/clerkwebhooks.js';

connectDB();

const app = express();
app.use(cors());             // Enable CORS
app.use(express.json());     // Parse JSON bodies
app.use(clerkMiddleware());  // Optional: Only if you’re protecting other routes

// ✅ Fix: Use app.post, not app.use
app.post("/api/clerk", clerkwebhooks);

// Health check
app.get('/', (req, res) => res.send("API is Working"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
