import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () =>
            console.log("✅ Database Connected")
        );

        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.error("❌ Database connection error:", error.message);
    }
};

export default connectDB;
