import { User } from '../models/user.model.js';

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // check for existing user
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({ message: 'Username or email already in use.' });
        }

        // create new user
        const newUser = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false
        });
        await newUser.save();

        return res.status(201).json({
            message: 'User registered successfully.',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        // checking if the user already exists
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // compare passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        user.loggedIn = true;
		await user.save();

        return res.status(200).json({
            message: 'User logged in successfully.',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
}

const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required.' });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        user.loggedIn = false;
        await user.save();

        return res.status(200).json({ message: 'User logged out successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
}

export { registerUser, loginUser, logoutUser };