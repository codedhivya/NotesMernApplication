
import express from 'express'

import userCtrl from '../controllers/userCtrl.js';

const router = express.Router();

router.post("/register", userCtrl.registerUser)

router.post("/login", userCtrl.loginUser)

router.get("/verify", userCtrl.verifiedToken)


export default router