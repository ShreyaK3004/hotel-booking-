import User from "../models/user.js";
import { Webhook } from "svix";

const clerkwebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        };

        const payloadString = JSON.stringify(req.body);
        const verifiedPayload = whook.verify(payloadString, headers);
        const { data, type } = verifiedPayload;

        const userdata = {
            _id: data.id,
            email: data.email_addresses[0]?.email_address ?? "",
            username: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
            image: data.image_url ?? "",
            recentSearchCities: [],
        };

        switch (type) {
            case "user.created":
                await User.create(userdata);
                console.log("✅ User created:", userdata.email);
                break;

            case "user.updated":
                await User.findByIdAndUpdate(data.id, userdata);
                console.log("🔁 User updated:", userdata.email);
                break;

            case "user.deleted":
                await User.findByIdAndDelete(data.id);
                console.log("🗑️ User deleted:", data.id);
                break;

            default:
                console.log("⚠️ Unknown webhook type:", type);
                break;
        }

        res.json({ success: true, message: "Webhook received" });

    } catch (error) {
        console.error("❌ Webhook Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export default clerkwebhooks;
