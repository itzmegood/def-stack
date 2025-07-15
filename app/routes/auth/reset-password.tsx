import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { data, Form, Link, redirect } from 'react-router';
import { toast } from 'sonner';

import { AuthLayout } from '~/components/auth-layout';
import { LoadingButton, PasswordField } from '~/components/forms';
import { useIsPending } from '~/hooks/use-is-pending';
import { authClient } from '~/lib/auth-client';
import { AppInfo } from '~/lib/config';
import { resetPasswordSchema } from '~/lib/validations/auth';
import type { Route } from './+types/reset-password';

export const meta: Route.MetaFunction = () => {
  return [{ title: `Password Reset - ${AppInfo.name}` }];
};

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');
  if (!token) return redirect('/auth/sign-in');
  return data({ token });
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: resetPasswordSchema });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const { error } = await authClient.resetPassword({
    newPassword: submission.value.newPassword,
    token: submission.value.token,
  });

  if (error) {
    return toast.error(error.message || 'An unexpected error occurred.');
  }

  toast.success('Password reset successfully! Please sign in again.');
  return redirect('/auth/sign-in');
}

export default function ResetPasswordRoute({
  loaderData: { token },
}: Route.ComponentProps) {
  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: resetPasswordSchema });
    },
    constraint: getZodConstraint(resetPasswordSchema),
    shouldRevalidate: 'onInput',
  });

  const isPending = useIsPending({
    formMethod: 'POST',
  });

  return (
    <AuthLayout
      description="Enter your new password below, minimum 8 characters, maximum 32 characters."
      title="Reset your password"
    >
      <Form className="grid gap-4" method="POST" {...getFormProps(form)}>
        <input name="token" type="hidden" value={token} />
        <PasswordField
          errors={fields.newPassword.errors}
          inputProps={{
            ...getInputProps(fields.newPassword, { type: 'password' }),
          }}
          labelProps={{ children: 'New Password' }}
        />
        <PasswordField
          errors={fields.confirmPassword.errors}
          inputProps={{
            ...getInputProps(fields.confirmPassword, { type: 'password' }),
          }}
          labelProps={{ children: 'Confirm New Password' }}
        />
        <LoadingButton
          buttonText="Reset Password"
          isPending={isPending}
          loadingText="Resetting password..."
        />
      </Form>

      <div className="text-center text-sm">
        <Link className="text-primary hover:underline" to="/auth/sign-in">
          ← Back to sign in
        </Link>
      </div>
    </AuthLayout>
  );
}
