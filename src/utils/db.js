import clientPromise from "mongodb";
import mongoose from "mongoose";

const connect = async () => {
  try {
    const client = await clientPromise;
    return client.db("next-app");
    console.log("Mongo Connection successfully established.");
  } catch (error) {
    throw new Error("Error connecting to Mongoose");
  }
};

export default connect;
