import chalk from 'chalk';
import User from '../models/userModel.js';

const getAllUsers = async (req, res) => {
  try {
    const myId = req.user.id;

    // Find all users except the logged-in user
    const filteredUsers = await User.find({
      _id: { $ne: myId },
    }).select('-password');
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(chalk.red('Error in getAllUsers: '), error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { getAllUsers };