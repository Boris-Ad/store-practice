import { X } from 'lucide-react';
import Link from 'next/link';
import { RegisterForm } from '../_components/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="w-[400px] p-4 bg-white rounded-md relative shadow-md">
      <div className="relative mb-6">
        <h3 className="text-center text-xl text-slate-700">Регистрация</h3>
        <Link href="/" className="absolute top-0 end-0 link-icon">
          <X className="text-slate-600" />
        </Link>
      </div>
      <RegisterForm />
      <Link className="w-full mt-3 block text-sm text-center text-muted-foreground hover:underline" href={'/auth/login'}>
        Есть аккаунт? Войти
      </Link>
    </div>
  );
};

export default RegisterPage;
