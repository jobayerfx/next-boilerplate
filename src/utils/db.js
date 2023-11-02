import { MongoClient } from "mongodb";

const connect = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db("next-app");
    console.log("Mongo Connection successfully established.");
    return db;
  } catch (error) {
    throw new Error("Error connecting to Mongoose");
  }
};

export default connect;
