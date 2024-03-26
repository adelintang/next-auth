import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL as string

const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('connect to mongodb successfully');
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;