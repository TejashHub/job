import mongoose from "mongoose";

const connectDB = async (uri, db_name) => {
  try {
    await mongoose.connect(`${uri}/${db_name}`);
  } catch (error) {
    console.log("MongoDB Connected Failed.", error);
  }
};

export default connectDB;
