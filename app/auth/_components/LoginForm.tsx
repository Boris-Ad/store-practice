'use client';

import React, { useEffect, useActionState } from 'react';
import Form from 'next/form';
import { useSearchParams } from 'next/navigation';
import { Loader } from 'lucide-react';
import { loginAction } from '../_actions/auth.actions';
import { useMyToast } from '@/hooks/useMyToast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const errors = searchParams.get('error');
  const notLinked = errors === 'OAuthAccountNotLinked';
  const [state, formAction, isPending] = useActionState(loginAction, undefined);
  const { setText } = useMyToast(state => state);

  useEffect(() => {
    if (notLinked) {
      setText('Этот email используется!', 'error');
    }
  }, [notLinked]);

  useEffect(() => {
    if (state?.message) {
      setText(state.message, 'error');
    }
  }, [state]);
  return (
    <Form action={formAction} className="space-y-4">
      <div className="space-y-2 relative text-slate-600">
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" defaultValue={state?.inputs?.email} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Пароль</Label>
          <Input id="password" name="password" type="password" defaultValue={state?.inputs?.password} />
        </div>
      </div>

      <Button disabled={isPending} className="w-full">
        {isPending ? <Loader className="animate-spin" /> : 'Войти'}
      </Button>
    </Form>
  );
};
