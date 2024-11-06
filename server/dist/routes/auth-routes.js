import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const login = async (req, res) => {
    const { username, password } = req.body;
    // Find the user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    // Generate a JWT token
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    // Return the token
    return res.json({ token });
};
const router = Router();
// POST /login - Login a user
router.post('/login', login);
export default router;
