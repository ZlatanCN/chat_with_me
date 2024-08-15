import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    // console.log('Token:', token);

    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - No token' });
    }

    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
    // console.log('Decoded token userId:', decodedToken.userId);

    // Check if user exists
    const user = await User.findById(decodedToken.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Pass user to the next middleware
    req.user = user;
    // console.log('UserId:', user._id);
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default protectRoute;