import express from "express";
import { GetAllUsers, RegisterUser } from "../controller/AuthController";

const AuthRouter = express.Router();

AuthRouter.post("/register", RegisterUser);
AuthRouter.get("/users", GetAllUsers);

export default AuthRouter;
