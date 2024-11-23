import { useState } from "react";

import { CurrencyLabel } from "entities/currency";

import { Option } from "../types";
import { Modal } from "./modal";

type Props = {
  disabled?: boolean;
  className?: string;
  symbol: string;
  logoURI?: string;
  options: Option[];

  onChange: (option: Option) => void;
};

export const Select = (props: Props) => {
  const { symbol, className, options, onChange, disabled, logoURI } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <CurrencyLabel
        className={className}
        disabled={disabled}
        icon={logoURI}
        symbol={symbol}
        onClick={() => {
          setIsOpen(true);
        }}
      />

      {isOpen && (
        <Modal
          onClose={() => setIsOpen(false)}
          onSelect={(currency) => {
            setIsOpen(false);
            onChange(currency);
          }}
          options={options}
          selectedSymbol={symbol}
        />
      )}
    </>
  );
};
