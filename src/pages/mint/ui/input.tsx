import { ReactNode, useEffect, useRef } from "react";

import { twMerge } from "tailwind-merge";

import { Button } from "shared/ui/button";
import { CurrencyInput } from "shared/ui/currency-input";
import { formatCurrency } from "shared/web3/utils";

type Props = {
  label: ReactNode;
  className?: string;
  value: string | undefined;
  decimals: number;
  onInputChange: (value: string | undefined) => void;
  onMaxClick?: () => void;
  slot?: ReactNode;
  usdValue?: string;
  balance?: string;
};

export const Input = (props: Props) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const {
    className,
    label,
    value,
    decimals,
    onInputChange,
    onMaxClick,
    slot,
    usdValue,
    balance,
  } = props;

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div
      className={twMerge(
        "flex flex-col rounded-lg bg-mirage px-7 py-2",
        className
      )}
    >
      {label && <div className="mb-1 text-sm text-bluishGrey">{label}</div>}

      <div className="flex items-center justify-between gap-x-1.5">
        <CurrencyInput
          ref={ref}
          value={value}
          decimals={decimals}
          placeholder="0"
          onChange={(value) => {
            onInputChange(value);
          }}
        />
        {slot}
      </div>
      <div className="mt-2 flex items-center">
        {usdValue && (
          <span className="mr-auto inline-flex text-sm text-bluishGrey">
            {formatCurrency(usdValue, { prefix: "$", decimalScale: 2 })}
          </span>
        )}

        {balance && (
          <span className="mr-2 inline-flex text-sm text-bluishGrey">
            Balance: {formatCurrency(balance, { decimalScale: 2 })}
          </span>
        )}
        {onMaxClick && (
          <Button
            theme="mirage"
            className="bg-balticSea px-4 py-1 text-sm text-aquaHaze"
            onClick={onMaxClick}
          >
            Max
          </Button>
        )}
      </div>
    </div>
  );
};
