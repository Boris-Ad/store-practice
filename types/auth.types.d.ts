import { JWT } from 'next-auth/jwt';
import { User } from 'next-auth';
import type { UserRoles } from '@/db/schema/users';

declare module 'next-auth' {
  interface User {
    role?: UserRoles;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    role?: UserRoles;
  }
}
