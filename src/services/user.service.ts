import { db } from '../config/db';
import { User } from '../models/User';

export class UserService {
  static async create(user: User) {
    const [result]: any = await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [user.name, user.email, user.password]
    );
    return { id: result.insertId, ...user };
  }

  static async findAll() {
    const [rows]: any = await db.query("SELECT id, name, email FROM users");
    return rows;
  }

  static async findByEmail(email: string) {
    const [rows]: any = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
  }
}
