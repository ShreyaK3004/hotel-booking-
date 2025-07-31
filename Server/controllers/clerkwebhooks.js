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

        // Verify the webhook signature
        whook.verify(JSON.stringify(req.body), headers);

        const { data, type } = req.body;

        const userdata = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: data.first_name + data.last_name,
            image: data.image_url,
        };

        switch (type) {
            case "user.created":
                await User.create(userdata);
                break;

            case "user.updated":
                await User.findByIdAndUpdate(data.id, userdata);
                break;

            case "user.deleted":
                await User.findByIdAndDelete(data.id);
                break;

            default:
                break;
        }

        res.json({ success: true, message: "Webhook received" });

    } catch (error) {
        console.error("Webhook Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export default clerkwebhooks;
