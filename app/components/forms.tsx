import type { VariantProps } from 'class-variance-authority';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useId, useState } from 'react';

import { Spinner } from '~/components/spinner';
import type { buttonVariants } from '~/components/ui/button';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { cn } from '~/lib/utils';
import { Textarea } from './ui/textarea';

export type ListOfErrors = Array<string | null | undefined> | null | undefined;

export interface FormFieldProps {
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  errors?: ListOfErrors;
  className?: string;
}

export interface LoadingButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  buttonText: string;
  loadingText: string;
  isPending: boolean;
  className?: string;
}

export function ErrorList({
  id,
  errors,
}: {
  errors?: ListOfErrors;
  id?: string;
}) {
  const errorsToRender = errors?.filter(Boolean);
  if (!errorsToRender?.length) return null;
  return (
    <ul className="flex flex-col" id={id}>
      {errorsToRender.map((e) => (
        <li className="text-destructive text-xs" key={e}>
          {e}
        </li>
      ))}
    </ul>
  );
}

export function InputField({
  labelProps,
  inputProps,
  errors,
  className,
}: FormFieldProps) {
  const fallbackId = useId();
  const id = inputProps.id || fallbackId;
  const errorId = errors?.length ? `${id}-error` : undefined;

  return (
    <div className={cn(className, 'flex flex-col gap-2')}>
      {labelProps && <Label htmlFor={id} {...labelProps} />}
      <Input
        aria-describedby={errorId}
        aria-invalid={errorId ? true : undefined}
        id={id}
        {...inputProps}
      />
      {errorId ? <ErrorList errors={errors} id={errorId} /> : null}
    </div>
  );
}

export function PasswordField({
  labelProps,
  inputProps,
  errors,
  className,
}: FormFieldProps) {
  const [isVisible, setIsVisible] = useState(false);
  const fallbackId = useId();
  const id = inputProps.id || fallbackId;
  const errorId = errors?.length ? `${id}-error` : undefined;
  const { type, ...restInputProps } = inputProps;

  return (
    <div className={cn(className, 'flex flex-col gap-2')}>
      {labelProps && <Label htmlFor={id} {...labelProps} />}
      <div className="relative">
        <Input
          aria-describedby={errorId}
          aria-invalid={errorId ? true : undefined}
          className="pr-9"
          id={id}
          type={isVisible ? 'text' : 'password'}
          {...restInputProps}
        />
        <Button
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          className="absolute inset-y-0 right-0 flex h-full items-center justify-center pr-3 text-muted-foreground/80 hover:bg-transparent"
          onClick={() => setIsVisible(!isVisible)}
          size="icon"
          tabIndex={-1}
          type="button"
          variant="ghost"
        >
          {isVisible ? (
            <EyeOffIcon aria-hidden="true" size={16} />
          ) : (
            <EyeIcon aria-hidden="true" size={16} />
          )}
        </Button>
      </div>
      {errorId ? <ErrorList errors={errors} id={errorId} /> : null}
    </div>
  );
}

export function TextareaField({
  labelProps,
  textareaProps,
  errors,
  className,
}: {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  textareaProps: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  errors?: ListOfErrors;
  className?: string;
}) {
  const fallbackId = useId();
  const id = textareaProps.id ?? textareaProps.name ?? fallbackId;
  const errorId = errors?.length ? `${id}-error` : undefined;
  return (
    <div className={cn(className, 'flex flex-col gap-2')}>
      <Label htmlFor={id} {...labelProps} />
      <Textarea
        aria-describedby={errorId}
        aria-invalid={errorId ? true : undefined}
        id={id}
        {...textareaProps}
      />
     {errorId ? <ErrorList errors={errors} id={errorId} /> : null}
    </div>
  );
}

export function LoadingButton({
  buttonText,
  loadingText,
  isPending,
  className = '',
  ...props
}: LoadingButtonProps) {
  return (
    <Button className={className} disabled={isPending} type="submit" {...props}>
      {isPending ? (
        <>
          <Spinner /> {loadingText}
        </>
      ) : (
        buttonText
      )}
    </Button>
  );
}
