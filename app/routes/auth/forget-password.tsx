import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { Form, Link } from 'react-router';
import { toast } from 'sonner';

import { AuthLayout } from '~/components/auth-layout';
import { InputField, LoadingButton } from '~/components/forms';
import { useIsPending } from '~/hooks/use-is-pending';
import { authClient } from '~/lib/auth-client';
import { AppInfo } from '~/lib/config';
import { forgetPasswordSchema } from '~/lib/validations/auth';
import type { Route } from './+types/forget-password';

export const meta: Route.MetaFunction = () => {
  return [{ title: `Forgot your password? - ${AppInfo.name}` }];
};

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: forgetPasswordSchema });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const { error } = await authClient.forgetPassword({
    email: submission.value.email,
    redirectTo: '/auth/reset-password',
  });

  return error
    ? toast.error(error.message || 'An unexpected error occurred.')
    : toast.success('Password reset link sent to your email!');
}

export default function ForgetPasswordRoute() {
  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: forgetPasswordSchema });
    },
    constraint: getZodConstraint(forgetPasswordSchema),
    shouldRevalidate: 'onInput',
  });

  const isPending = useIsPending({
    formMethod: 'POST',
  });

  return (
    <AuthLayout
      description="Enter your email address and we will send you a password reset link."
      title="Forgot your password?"
    >
      <Form className="grid gap-4" method="POST" {...getFormProps(form)}>
        <InputField
          errors={fields.email.errors}
          inputProps={{
            ...getInputProps(fields.email, { type: 'email' }),
            placeholder: 'Enter your email',
            autoComplete: 'email',
          }}
        />
        <LoadingButton
          buttonText="Send reset link"
          isPending={isPending}
          loadingText="Sending reset link..."
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
