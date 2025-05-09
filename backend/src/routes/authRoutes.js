import express from "express";
import User from "../models/User.js"; 

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Validate user input
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        
        if(username.length < 3) {
            return res.status(400).json({ message: "Username must be at least 3 characters long" });
        }

        // Check if user already exists
        // const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        // if (existingUser) {
        //     return res.status(400).json({ message: "User already exists" });
        // }
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }
         
         //get random avatar
        const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;
         
        const User = new User({
            username,
            email,
            password,
            profileImage,
        });
        await User.save();
       

    }catch (error) {
        console.error("Error in registration:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
 });

router.post("/login", async (req, res) => {
   res.send("login") 
});
export default router;