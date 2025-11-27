import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { auth } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', auth, UserController.list);

export default router;
