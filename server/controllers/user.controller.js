const User = require('../models/user.model');
const Role = require('../models/role.model');
const bcrypt = require('bcryptjs');
const { SetUpTokenToCookies } = require('../utilities/setUpTokenToCookies');

// Test route to check connection
const Test = async (req, res) => {
    res.send("Test route works");
}

// Signup Function
const SignUp = async (req, res) => {
    const { fullName, email, password, phoneNumber } = req.body;

    if (!fullName || !email || !password || !phoneNumber) {
        return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User is already created. Try to sign in!" });
        }

        const hashedPassword = await bcrypt.hash(password, Number(process.env.CRYPTO_KEY));
        const newUser = new User({
            email,
            password: hashedPassword,
            fullName,
            phoneNumber
        });

        await newUser.save();

        const roleName = "Entrepreneur";
        const role = await Role.findOne({ name: roleName });

        SetUpTokenToCookies(res, newUser._id, role?.name || roleName);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: { ...newUser._doc, password: undefined }
        });

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

// Login Function
const Login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: `No user found with email: ${email}` });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }

        const roleName = "Entrepreneur";
        const role = await Role.findOne({ name: roleName });

        SetUpTokenToCookies(res, user._id, role?.name || roleName);

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: { ...user._doc, password: undefined }
        });

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

module.exports = { Test, SignUp, Login };
