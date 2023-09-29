/*import mongoose from "mongoose";

import { MongoMemoryServer } from "mongodb-memory-server";
import ENV from '../config.js'

async function connect(){

    const mongod = await MongoMemoryServer.create();
    const getUri = mongod.getUri();

    mongoose.set('strictQuery', true)
    // const db = await mongoose.connect(getUri);
    const db = await mongoose.connect(ENV.ATLAS_URI);
    console.log("Database Connected")
    return db;
}

export default connect; */


/*import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import ENV from '../config.js';

const connect = async () => {
  const mongod = await MongoMemoryServer.create();
  const getUri = mongod.getUri();

  mongoose.set('strictQuery', true);

  try {
    const db = await mongoose.connect(ENV.ATLAS_URI);
    console.log("Database Connected");
    return db;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error; // Optionally rethrow the error for handling elsewhere
  }
};

export default connect;*/
//const mongoose = require("mongoose");
import mongoose from "mongoose";

const connectDB = (url) => {
return mongoose.connect(url, {
useNewUrlParser: true,

useUnifiedTopology: true,
});
};
export default connectDB;
//module.exports = connectDB;
