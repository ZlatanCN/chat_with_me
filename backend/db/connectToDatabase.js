import mongoose from 'mongoose';
import chalk from 'chalk';
import { GridFSBucket } from 'mongodb';

let gfs;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log(chalk.blueBright('Connected to the MongoDB'));
    gfs = new GridFSBucket(mongoose.connection.db, {
      bucketName: 'uploads',
    })
  } catch (error) {
    console.log('Error connecting to the database: ', error.message);
  }
}

export { connectToDatabase, gfs };