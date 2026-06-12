import supabase from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const login = async (req, res) => {
  const { user, password } = req.body;

  const columnName = user.includes("@") ? "email" : "username";

  //CALLS THE DATABSE FOR USER INFORMATION
  const { data, error } = await supabase
    .from("db_users")
    .select("*")
    .eq(columnName, user)
    .single();

  //IF INVALID USERNAME OR EMAIL THROW ERROR
  if (error) {
    return res.status(401).json({
      message: "Invalid Username or Password",
    });
  }

  //IF DATA IS VALID IN DATABASE
  if (data) {
    ///CHECK IF THE PASSWORD IS CORRRECT OR NOT
    const matchPassword = await bcrypt.compare(password, data.password_hash);

    //IF THE PASSWORD IS CORREECT
    if (matchPassword) {
      ///GENRATE A TOKEN FOR INDETIFICATION OF THE USER
      const token = jwt.sign(data.id, process.env.JWT_SECRET);
      ///RETURN THE TOKEN
      res
        .status(200)
        .cookie("token", token)
        .json({ message: "Login Successful" });
    }
    //IF PASSWORD NOT MATCHES
    else {
      return res.status(401).json({
        message: "Invalid Username or Password",
      });
    }
  }
};

export default login;
