const mongo = require("mongodb");

const MongoClient = mongo.MongoClient;

const MONGO_URL =
  "mongodb+srv://root:Harsh2000@cluster0.8vweabt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      callback();
      _db = client.db("airbnb");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
};

const getDB = () => {
  if (!_db) {
    throw new Error("No database found! Please connect first.");
  }
  return _db;
}

module.exports.mongoConnect = mongoConnect;
module.exports.getDB = getDB;
