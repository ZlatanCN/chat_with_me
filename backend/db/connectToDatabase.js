import mongoose from 'mongoose';
import chalk from 'chalk';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log(chalk.blueBright('Connected to the MongoDB'));
  } catch (error) {
    console.log('Error connecting to the database: ', error.message);
  }
}

export default connectToDatabase;