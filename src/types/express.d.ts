import { User } from 'src/User/user.entity';

declare module 'express' {
  interface Request {
    user?: Partial<User>;
  }
}
