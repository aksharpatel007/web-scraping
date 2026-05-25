import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { setAuthCookie, signToken } from "../utils/generateToken.js";

export const signup = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) {
        return res.status(409).json({ message: "Email already exists" });
    }

    const user = await User.create({ name, email, password });
    const token = signToken({ id: user._id, role: user.role });
    setAuthCookie(res, token);

    res.status(201).json({
        message: "Signup successful",
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
});

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signToken({ id: user._id, role: user.role });
    setAuthCookie(res, token);

    res.json({
        message: "Login successful",
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
});

export const logout = asyncHandler(async (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
});

export const getMe = asyncHandler(async (req, res) => {
    res.json({ user: req.user });
});

export const forgotPassword = asyncHandler(async (req, res) => {
    res.json({ message: "Password reset flow can be integrated with email provider." });
});
