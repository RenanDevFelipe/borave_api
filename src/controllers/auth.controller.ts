import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/user.service';

export class AuthController {
  static async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    const user = await UserService.create({ name, email, password: hashed });

    return res.json(user);
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await UserService.findByEmail(email);
    if (!user) return res.status(404).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: "1d" });

    return res.json({ token });
  }
}
