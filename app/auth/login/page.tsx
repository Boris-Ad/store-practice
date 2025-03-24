import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { LoginForm } from '../_components/LoginForm';

const LoginPage = async () => {
  return (
    <div className="w-[400px] p-4 bg-white rounded-md relative shadow-md">
      <div className="relative mb-6">
        <h3 className="text-center text-xl text-slate-700">Авторизация</h3>
        <Link href="/" className="absolute top-0 end-0 link-icon">
          <X className="text-slate-600" />
        </Link>
      </div>
      <Suspense>
        <LoginForm />
      </Suspense>
      <div className="h-[1px] mt-5 text-slate-500 bg-slate-200 relative">
        <span className="px-2 bg-background absolute start-1/2 -translate-y-1/2 -translate-x-1/2 text-sm">или</span>
      </div>
      <LoginButtonGoogle />
      <Link className="w-full mt-3 block text-sm text-center text-slate-500 hover:underline" href={'/auth/register'}>
        Нет аккаунта? Регистрация
      </Link>
    </div>
  );
};

export default LoginPage;

const LoginButtonGoogle = () => {
  return (
    <form
      className="w-full pt-1"
      action={async () => {
        'use server';
        await signIn('google');
      }}
    >
      <button type="submit" className="mt-5 p-1.5 border border-slate-200 w-full rounded-full hover:bg-muted/40 transition-colors flex justify-center">
        <Image src="/google-logo.svg" alt="Google" width={22} height={22} />
      </button>
    </form>
  );
};
