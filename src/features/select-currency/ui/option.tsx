import { twJoin, twMerge } from "tailwind-merge";
import { formatUnits } from "viem";

import { useBalanceQuery } from "entities/currency";
import { Img } from "shared/ui/img";
import { formatCurrency, shortAddress } from "shared/web3/utils";

import { Option as OptionType } from "../types";

type Props = {
  className?: string;
  isSelected?: boolean;
  option: OptionType;

  onClick: () => void;
};

export const Option = ({ className, option, isSelected, onClick }: Props) => {
  const { symbol, address, chainId, logoURI, decimals } = option;

  const usdValue = "24.12";

  const query = useBalanceQuery(address, {
    chainId,
    select: (balance) => formatUnits(balance, decimals),
  });

  return (
    <li
      onClick={onClick}
      className={twMerge(
        "relative flex cursor-pointer items-center gap-x-4 rounded-md px-4 py-2.5 text-xl text-white hover:bg-balticSea active:brightness-125",
        isSelected && "bg-balticSea",
        className
      )}
    >
      <Img
        src={logoURI}
        className="inline-flex size-[38px] rounded-full"
        alt={symbol}
      />
      <div className="flex flex-col">
        <span className={twJoin("inline-flex font-medium text-white")}>
          {symbol}
        </span>
        <span className="mt-1 text-xs text-grey">{shortAddress(address)}</span>
      </div>
      <div className="ml-auto flex flex-col">
        <span className="text-right font-medium text-white">
          {query.data ?? 0}
        </span>
        {usdValue && (
          <span className="mt-1 text-right text-xs text-grey">
            {formatCurrency(usdValue, { decimalScale: 2, prefix: "$" })}
          </span>
        )}
      </div>
    </li>
  );
};
