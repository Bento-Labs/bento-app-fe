import { twMerge } from "tailwind-merge";

import { Toggle } from "shared/ui/toggle";

type Props = {
  className?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

export const BentoPlusToggle = ({ className, checked, onChange }: Props) => {
  return (
    <div className={twMerge("flex items-center", className)}>
      <span className="mr-auto inline-flex font-medium text-boulder">
        Mint BentoUSD+
      </span>
      <label className="flex cursor-pointer select-none items-center gap-x-2">
        <span className="inline-flex font-medium text-brightSun">
          {checked ? "Yes" : "No"}
        </span>
        <Toggle
          className="shrink-0"
          checked={checked}
          onChange={() => {
            onChange(!checked);
          }}
        />
      </label>
    </div>
  );
};
