import { twJoin, twMerge } from "tailwind-merge";
import { erc20Abi } from "viem";
import { useAccount, useReadContract } from "wagmi";

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
  const { icon, symbol, address } = option;
  const { address: accountAddress } = useAccount();

  const value = "22";
  const usdValue = "24.12";

  const query = useReadContract({
    abi: erc20Abi,
    address,
    functionName: "balanceOf",
    account: accountAddress,
  });

  console.log(query);

  const balance = query.data;

  console.log(balance);

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
        src={icon}
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
        {value && <span className="font-medium text-white">{value}</span>}
        {usdValue && (
          <span className="mt-1 text-xs text-grey">
            {formatCurrency(usdValue, { decimalScale: 2, prefix: "$" })}
          </span>
        )}
      </div>
    </li>
  );
};
