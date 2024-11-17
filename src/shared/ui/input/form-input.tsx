import { ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

import { Icon } from "../icon";
import { Spinner } from "../spinner";
import { Input } from "./input";

type FormProps = {
  isLoading?: boolean;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

type Props = Omit<ComponentProps<typeof Input>, keyof FormProps> & FormProps;

export const FormInput = ({
  className,
  isLoading,
  value,
  onSubmit,
  ...props
}: Props) => {
  return (
    <form
      onSubmit={onSubmit}
      className={twMerge("relative flex flex-col", className)}
    >
      <Input {...props} disabled={isLoading || props.disabled} />

      <button
        disabled={isLoading}
        className="absolute right-4 top-1/2 -translate-y-1/2"
        type="submit"
      >
        {isLoading ? (
          <Spinner className="size-4" />
        ) : (
          <Icon name="arrowRight" className="size-3.5 text-white/50" />
        )}
      </button>
    </form>
  );
};
