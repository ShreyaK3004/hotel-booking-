import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // ✅ Load .env variables at the top

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () =>
            console.log("✅ Database Connected")
        );

        await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.error("❌ Database connection error:", error.message);
    }
};

export default connectDB;
