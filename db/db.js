import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

await client.connect();

const db = client.db("nodejs_prac_db");
const userCollection = db.collection("users");

// userCollection.insertOne({
//   name: "poop",
//   age: 24,
// });

// userCollection.insertMany([
//   {
//     greet: "hello deep",
//     h: " 90",
//   },
//   {
//     greet: "hello deep",
//     h: " 0",
//     poop: true,
//   },
// ]);

// userCollection.updateOne(
//   {
//     name: "deep",
//   },
//   {
//     $set: {
//       age: 30,
//     },
//   },
// );
