import React, { useState } from "react";

import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  id?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
};

export const Toggle = ({
  id,
  className,
  checked: checkedProp,
  defaultChecked = false,
  disabled = false,
  onChange,
}: Props) => {
  const [checkedState, setCheckedState] = useState(defaultChecked);
  const checked = checkedProp ?? checkedState;

  return (
    <label
      id={`label-${id}`}
      className={twMerge(
        "relative flex w-[22px] cursor-pointer select-none items-center rounded-full border-2 border-solid border-brightSun bg-transparent p-0.5 transition-colors",
        className
      )}
    >
      <motion.div
        className={twMerge(
          "size-1 rounded-full bg-white",
          checked && "bg-brightSun"
        )}
        animate={{ transition: { duration: 0.15 }, x: checked ? 10 : 0 }}
      />
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          if (disabled) return;

          setCheckedState(e.target.checked);
          onChange?.(e);
        }}
        className="invisible absolute left-0 top-0 size-0 appearance-none"
      />
    </label>
  );
};
