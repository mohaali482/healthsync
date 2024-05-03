import 'next-auth/jwt';
import type { User } from 'next-auth';

declare module 'next-auth/jwt' {
  interface JWT {
    id: number;
    name: string;
    username: string;
    hospitalId: number | null;
    role: Role;
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      username: string;
      hospitalId: number | null;
      role: Role;
    };
  }
}
