import type { TextFieldType } from '@/types/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@components/ui/input-group';
import type React from 'react';
import { Field, FieldDescription, FieldLabel } from '@components/ui/field';
import { cn } from '@/lib/utils';

type Props = {
  type: TextFieldType;
  label?: string;
  labelRight?: React.ReactNode;
  id?: string;
  description?: string;
  placeholder?: string;
  value: string;
  error?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
  onChange: (value: string) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
};

const TextField = ({
  type,
  label,
  labelRight,
  id,
  description,
  placeholder,
  value,
  error,
  className,
  inputClassName,
  labelClassName,
  containerClassName,
  onChange,
  leftIcon,
  rightIcon,
  onRightIconClick,
}: Props) => {
  return (
    <Field className={className}>
      {(label || labelRight) && (
        <div className="flex items-center justify-between">
          {label && (
            <FieldLabel
              className={cn('text-xs font-sans text-[#BBBBBB]', labelClassName)}
              htmlFor={id}
            >
              {label}
            </FieldLabel>
          )}
          {labelRight}
        </div>
      )}
      <InputGroup
        className={cn(
          `w-full rounded-[12px] bg-block-bg
          border-2 border-zinc-300
          hover:border-[#25531F] transition-all duration-100 ease-in-out
          focus-within:border-[#25531F]!

          /* Автоматична зміна кольору для всіх вкладених SVG */
          [&_svg]:text-zinc-400 [&_svg]:transition-colors
          hover:[&_svg]:text-[#25531F]
          focus-within:[&_svg]:text-[#25531F]!`,

          error &&
            `border-red-500 focus-within:border-red-500! 
                    [&_svg]:text-red-500 focus-within:[&_svg]:text-red-500!`,
          containerClassName
        )}
      >
        <InputGroupInput
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={cn(
            `text-xs text-text-h focus:outline-none focus-visible:outline-none focus-visible:ring-0
            placeholder:text-xs placeholder:[font-family:var(--font-sans)] placeholder:text-text-muted`,
            error && 'placeholder:text-red-400',
            inputClassName
          )}
        />
        {leftIcon && <InputGroupAddon>{leftIcon}</InputGroupAddon>}
        {rightIcon && (
          <InputGroupAddon
            align="inline-end"
            onClick={onRightIconClick}
            className={onRightIconClick ? 'cursor-pointer' : ''}
          >
            {rightIcon}
          </InputGroupAddon>
        )}
      </InputGroup>
      {description && <FieldDescription>{description}</FieldDescription>}
      {error && (
        <FieldDescription className="text-red-500">{error}</FieldDescription>
      )}
    </Field>
  );
};

export default TextField;
