import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  static async list(req: Request, res: Response) {
    const users = await UserService.findAll();
    return res.json(users);
  }
}
