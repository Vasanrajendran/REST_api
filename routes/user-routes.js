import express from "express";
import { addUsers, getAlluser, login } from "../controllers/user-controller.js";

const router=express.Router();

router.get('/',getAlluser);
router.post('/signup',addUsers);
router.post('/login',login);

export default router;