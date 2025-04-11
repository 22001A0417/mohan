/*require('dotenv').config();

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

//const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"
const dbUrl = process.env.ATLASDB_URL;

main()
    .then(() => {
    console.log("connection successful");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(dbUrl);
};

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: '67f0c55d269b455e838e79e9'}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();*/

require('dotenv').config(); 

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const dbUrl = process.env.ATLASDB_URL;

async function main() {
  try {
    await mongoose.connect(dbUrl, {
      serverSelectionTimeoutMS: 30000  
    });

    console.log("Connection successful");

    await initDB();
  } catch (err) {
    console.error("Error during database connection:", err);
  }
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    console.log("Existing listings deleted");

    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: '67f0c55d269b455e838e79e9'  
    }));

    await Listing.insertMany(initData.data);
    console.log("Data was initialized successfully");
    
    mongoose.connection.close();
  } catch (err) {
    console.error("Error initializing data:", err);
  }
}

main();
