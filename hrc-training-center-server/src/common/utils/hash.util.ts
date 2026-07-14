import * as bcrypt from 'bcrypt';

export class HashUtil {
  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS || '8'));
    return bcrypt.hash(password, salt);
  }

  static async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
