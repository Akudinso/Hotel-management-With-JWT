import express from 'express';
import UserController from '../controllers/user.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { registerSchema, loginSchema } from '../models/user.model.js';

const userRouter = express.Router();

userRouter.post('/register', validate(registerSchema), UserController.register);
userRouter.post('/login', validate(loginSchema), UserController.login);

export default userRouter;
