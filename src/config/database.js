import mongoose from 'mongoose';

const connectDB = async (mongoURI) => {
  try {
      const connectionInstance = await mongoose.connect(
          `${process.env.MONGODB_URI}`,
      );
      console.log(`\n MongoDB connected!!! ${connectionInstance.connection.host}`);
  } catch (error) {
      logger.error(`MongoDB connection error: ${error.message}`);
      process.exit(1);
  }
};

export default connectDB;