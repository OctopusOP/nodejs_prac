import express from "express";
import supabase from "./db/db.js";
import bcrypt from "bcrypt";
import registeruser from "./auth/register.js";
import login from "./auth/login.js";

const app = express();
app.use(express.json());

app.post("/api/auth/register", registeruser);
app.post("/api/auth/login", login);
// app.post("api/add-post",);

export default app;
