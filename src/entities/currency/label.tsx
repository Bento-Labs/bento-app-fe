import { twMerge } from "tailwind-merge";

import currencyPlaceholderSvg from "shared/ui/icon/svg/currency-placeholder.svg";
import { Img } from "shared/ui/img";

interface Props {
  disabled?: boolean;
  className?: string;
  icon?: string;
  symbol: string;
  onClick?: () => void;
}

export function Label(props: Props) {
  const { onClick, icon, symbol, disabled, className } = props;
  return (
    <div
      onClick={onClick}
      className={twMerge(
        "relative flex shrink-0 items-center space-x-1.5 text-xl font-bold text-white",
        onClick && "cursor-pointer  pl-[5px] pr-[8px] hover:bg-white/5",
        disabled && "pointer-events-none cursor-default",
        className
      )}
    >
      <Img
        src={icon}
        className="size-5"
        fallbackUrl={currencyPlaceholderSvg}
        alt={symbol}
      />
      <span>{symbol}</span>
    </div>
  );
}
