'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import { LogOut, ShieldUser, User } from 'lucide-react';
import { ButtonDropMenu } from '@/components/ButtonDropMenu';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export const UserButton = ({ session }: { session: Session | null }) => {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const userName = session?.user?.name && session.user.name[0].toUpperCase();
  const userImage = session?.user?.image;
  const adminRole = session?.user?.role === 'admin';

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsVisible(true)}
        className={cn(
          'h-8 w-8 grid place-content-center rounded-full border border-face-border text-face-border hover:border-slate-500 hover:text-slate-500 transition-colors cursor-pointer relative overflow-hidden',
          { 'bg-pink-500 border-none': session }
        )}
      >
        {userImage ? <Image src={userImage} alt="UserImage" fill sizes="32w" className="object-cover" /> : <span className="text-white">{userName}</span>}
        {session == null && <User size={22} />}
      </button>
      {buttonRef.current && (
        <ButtonDropMenu isVisible={isVisible} removeMenu={() => setIsVisible(false)} buttonRef={buttonRef.current}>
          <ul className="text-slate-100 bg-slate-700 font-roboto font-light">
            {session ? (
              <>
                <li className="px-2 pt-2 pb-1">{session.user?.name}</li>
                <Separator className="bg-slate-600" />
                {adminRole && (
                  <li className="px-2 py-1 hover:bg-slate-600">
                    <Link href="/dashboard" className="flex items-center space-x-1">
                      <ShieldUser size={18} />
                      <span>Админка</span>
                    </Link>
                  </li>
                )}
                <li className="p-2 pt-1 hover:bg-slate-600">
                  <button onClick={() => signOut()} className="w-full flex items-center space-x-1">
                    <LogOut size={16} />
                    <span>Выход</span>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="p-2 pb-1 hover:bg-slate-600">
                  <button onClick={() => signIn()} className="w-full flex">
                    Вход
                  </button>
                </li>
                <li className="p-2 pt-1 hover:bg-slate-600">
                  <Link href="/auth/register" className="flex">
                    Регистрация
                  </Link>
                </li>
              </>
            )}
          </ul>
        </ButtonDropMenu>
      )}
    </>
  );
};
