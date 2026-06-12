import { Timestamp } from "mongodb";
import mongoose, { mongo } from "mongoose";

try {
  await mongoose.connect("mongodb://localhost:27017/skyrocket");
  mongoose.set("debug", true);
} catch (error) {
  console.error(error);
}

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    //   createdAt: { type: Date, default: Date.now() },
    //   updatedAt: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
  },
);

// userSchema.pre(["updateOne", "updateMany"], function (next) {
//   this.set({
//     updatedAt: Date.now(),
//   });
//   next;
// });

const userModel = mongoose.model("user", userSchema);

// await userModel.create({
//   name: "raiii",
//   username: "raii",
//   email: "raii@gmail.com",
//   password: "deep@123",
// });

await userModel.updateOne(
  {
    username: "raii",
  },
  {
    $set: {
      password: "raii@123",
    },
  },
);

await mongoose.connection.close();

// console.log(await userModel.find());
