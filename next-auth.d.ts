import 'next-auth/jwt';
import type { User } from 'next-auth';

const Role: {
  USER: 'USER';
  GOVERNMENT: 'GOVERNMENT';
  HOSPITAL_ADMIN: 'HOSPITAL_ADMIN';
  DATA_ENCODER: 'DATA_ENCODER';
  SUPER_USER: 'SUPER_USER';
} = {
  USER: 'USER',
  GOVERNMENT: 'GOVERNMENT',
  HOSPITAL_ADMIN: 'HOSPITAL_ADMIN',
  DATA_ENCODER: 'DATA_ENCODER',
  SUPER_USER: 'SUPER_USER'
};
type Role = (typeof Role)[keyof typeof Role];

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
