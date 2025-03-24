'use client';

import React, { useEffect, useState, useActionState } from 'react';
import { useRouter } from 'next/navigation';
import Form from 'next/form';
import clsx from 'clsx';
import { Loader } from 'lucide-react';
import { useMyToast } from '@/hooks/useMyToast';
import { registerAction } from '../_actions/auth.actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';



export const RegisterForm = () => {
    const [state, formAction, isPending] = useActionState(registerAction, {});
    const [errors, setErrors] = useState<typeof state.errors>();
    const { setText } = useMyToast(state => state);
    const router = useRouter();

    useEffect(() => {
        setErrors(state.errors);
        if (state.success) {
          setText('Регистрация прошла успешно!', 'success');
          router.push('/auth/sign-in');
        }
      }, [state]);

      return (
        <>
          <Form action={formAction} className="space-y-5">
            <div className="space-y-3">
              <div className="relative space-y-1">
                <Label htmlFor="name">Имя</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={state.inputs?.name}
                  autoComplete="off"
                  onFocus={() => setErrors(prev => ({ ...prev, name: undefined }))}
                  className={clsx({ 'border-destructive/80': errors?.name })}
                />
                {errors?.name && <p className="text-xs text-destructive absolute start-0 bottom-0 translate-y-full">{errors.name}</p>}
              </div>
              <div className="relative space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={state.inputs?.email}
                  onFocus={() => setErrors(prev => ({ ...prev, email: undefined }))}
                  className={clsx({ 'border-destructive/80': errors?.email })}
                />
                {errors?.email && <p className="text-xs text-destructive absolute start-0 bottom-0 translate-y-full">{errors.email}</p>}
              </div>
              <div className="relative space-y-1">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  defaultValue={state.inputs?.password}
                  onFocus={() => setErrors(prev => ({ ...prev, password: undefined }))}
                  className={clsx({ 'border-destructive/80': errors?.password })}
                />
                {errors?.password && <p className="text-xs text-destructive absolute start-0 bottom-0 translate-y-full">{errors.password}</p>}
              </div>
            </div>
    
            <Button disabled={isPending} className="w-full">
              {isPending ? <Loader className="animate-spin" /> : 'Зарегистрироваться'}
            </Button>
          </Form>
        </>
      );
}