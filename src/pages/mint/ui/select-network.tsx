import { twMerge } from "tailwind-merge";

import { Button } from "shared/ui/button";

type Props = {
  className?: string;
};

export const SelectNetwork = ({ className }: Props) => {
  return (
    <div className={twMerge("flex items-center justify-between", className)}>
      <span className="font-medium text-boulder">
        Select Network For Minting
      </span>
      <Button theme="mirage" className="ml-auto">
        Ethereum
      </Button>
    </div>
  );
};
