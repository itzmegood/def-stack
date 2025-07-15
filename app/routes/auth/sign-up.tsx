import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { Form, Link, redirect } from 'react-router';
import { toast } from 'sonner';

import { AuthLayout } from '~/components/auth-layout';
import { InputField, LoadingButton, PasswordField } from '~/components/forms';
import { useIsPending } from '~/hooks/use-is-pending';
import { authClient } from '~/lib/auth-client';
import { AppInfo } from '~/lib/config';
import { signUpSchema } from '~/lib/validations/auth';
import type { Route } from './+types/sign-up';

export const meta: Route.MetaFunction = () => {
  return [{ title: `Sign Up - ${AppInfo.name}` }];
};

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: signUpSchema });

  console.log('clientAction', submission);

  if (submission.status !== 'success') {
    return submission.reply();
  }

  console.log('clientAction', submission.value);

  const { error } = await authClient.signUp.email({
    callbackURL: '/',
    ...submission.value,
  });

  console.log('clientAction', error);

  if (error) {
    return toast.error(error.message || 'An unexpected error occurred.');
  }

  toast.success(
    'Sign up successful! Please check your email for a verification link.'
  );
  return redirect('/auth/sign-in');
}

export default function SignUpRoute() {
  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signUpSchema });
    },
    constraint: getZodConstraint(signUpSchema),
    shouldRevalidate: 'onInput',
  });

  const isPending = useIsPending({
    formMethod: 'POST',
  });

  return (
    <AuthLayout
      description="Welcome! Please fill in the details to get started."
      title="Create your account"
    >
      {/* Sign up form */}
      <Form className="grid gap-4" method="POST" {...getFormProps(form)}>
        <InputField
          errors={fields.name.errors}
          inputProps={{
            ...getInputProps(fields.name, { type: 'text' }),
            placeholder: 'John Doe',
            autoComplete: 'name',
            enterKeyHint: 'next',
            required: true,
          }}
          labelProps={{ children: 'Name' }}
        />
        <InputField
          errors={fields.email.errors}
          inputProps={{
            ...getInputProps(fields.email, { type: 'email' }),
            placeholder: 'johndoe@example.com',
            autoComplete: 'email',
            enterKeyHint: 'next',
          }}
          labelProps={{ children: 'Email' }}
        />
        <PasswordField
          errors={fields.password.errors}
          inputProps={{
            ...getInputProps(fields.password, { type: 'password' }),
            placeholder: 'Enter a unique password',
            autoComplete: 'password',
            enterKeyHint: 'done',
          }}
          labelProps={{ children: 'Password' }}
        />
        <LoadingButton
          buttonText="Sign Up"
          isPending={isPending}
          loadingText="Signing up..."
        />
      </Form>

      {/* Terms of service */}
      <div className="text-balance text-center text-muted-foreground text-xs">
        By clicking continue, you agree to our{' '}
        <a className="text-primary hover:underline" href="/">
          Terms of Service
        </a>
        {' and '}
        <a className="text-primary hover:underline" href="/">
          Privacy Policy
        </a>
        .
      </div>

      {/* Sign in */}
      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link className="text-primary hover:underline" to="/auth/sign-in">
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
}
