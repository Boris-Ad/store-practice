'use client';

import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import Link from 'next/link';
import { LogOut, Store, User } from 'lucide-react';

export const AdminButton = ({ session }: { session: Session | null }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar>
          <AvatarImage src={session?.user?.image || undefined} />
          <AvatarFallback className="text-xl font-medium bg-amber-400">{session?.user?.name ? session.user.name[0].toUpperCase() : <User />}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-3">
        {session && <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
          <LogOut />
          Выход
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/">
            <Store /> Магазин
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
