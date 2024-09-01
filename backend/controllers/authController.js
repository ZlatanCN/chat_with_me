import User from '../models/userModel.js';
import chalk from 'chalk';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

const signup = async (req, res) => {
  try {
    const { name, username, password, confirmedPassword, gender } = req.body;

    // Check if the password and confirmed password match
    if (password !== confirmedPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if the user is already exists
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const avatar = `https://avatar.iran.liara.run/public/${gender === 'male'
      ? ('boy')
      : ('girl')}?username=${username}`;
    const newUser = new User({
      name,
      username,
      password: hashedPassword,
      gender,
      avatar,
    });
    if (newUser) {
      await newUser.save();
      generateToken(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        avatar: newUser.avatar,
      });
    } else {
      res.status(400).json({ message: chalk.red('Error in creating user') });
    }
  } catch (error) {
    console.log(chalk.red('Error in signup:'), error.message);
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user?.password || '');
    if (isMatch) {
      generateToken(user._id, res);
      res.status(200).json({
        _id: user._id,
        name: user.name,
        username: user.username,
        avatar: user.avatar,
      });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.log(chalk.red('Error in login:'), error.message);
    res.status(500).json({ message: error.message });
  }
};

const logout = (req, res) => {
  try {
    // Clear the cookie
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log(chalk.red('Error in logout:'), error.message);
    res.status(500).json({ error: error.message });
  }
};

export { signup, login, logout };