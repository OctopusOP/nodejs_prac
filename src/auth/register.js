import app from "../app.js";
import supabase from "../db/db.js";
import bcrypt from "bcrypt";

const registeruser = async (req, res) => {
  const { username, email, password } = req.body;

  //password hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const { data, error } = await supabase
      .from("db_users")
      .insert({ username, email, password_hash: hashedPassword })
      .select()
      .single();

    //IF THE USER ALREADY EXISTS RETURN
    if (error) {
      if (error.code === "23505") {
        return res.status(409).json({
          message: "User Already Exists",
        });
      }
      console.log({ error });
    }

    console.log(data);
    //SUCCESSFUL REGISTRATION
    return res.status(201).json({
      message: "Registration Successful",
    });

    ///IF THERE IS ANY ERROR IN DATABASE OPERAION
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An Error Occured While Registering The User",
    });
  }
};

export default registeruser;
