import { useState } from "react";

import { CurrencyLabel } from "entities/currency";

import { Option } from "../types";
import { Modal } from "./modal";

type Props = {
  disabled?: boolean;
  className?: string;
  symbol: string;
  options: Option[];

  onChange: (option: Option) => void;
};

export const Select = (props: Props) => {
  const { symbol, className, options, onChange, disabled } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <CurrencyLabel
        className={className}
        disabled={disabled}
        symbol={symbol}
        onClick={() => {
          setIsOpen(true);
        }}
      />

      {isOpen && (
        <Modal
          onClose={() => setIsOpen(false)}
          onSelect={onChange}
          options={options}
          selectedSymbol={symbol}
        />
      )}
    </>
  );
};
