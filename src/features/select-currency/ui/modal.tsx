import { useChainId } from "wagmi";

import { Modal as M } from "shared/ui/modal";

import { currenciesList } from "../const";
import { type Option as OptionType } from "../types";
import { Option } from "./option";

type Props = {
  selectedSymbol: string;
  options?: OptionType[];
  onSelect: (option: OptionType) => void;
  onClose: () => void;
};

export const Modal = (props: Props) => {
  const { options = currenciesList, selectedSymbol, onSelect, onClose } = props;
  const chainId = useChainId();
  const filteredOptions = options.filter((cur) => cur.chainId === chainId);

  return (
    <M onClose={onClose}>
      <M.Overlay
        className="absolute z-20 bg-woodSmoke/50 px-5 py-2 backdrop-blur-none"
        style={{
          backgroundImage: `url(/bg-stars.png)`,
        }}
      >
        <M.Content className="mx-auto w-1/3 overflow-scroll bg-black">
          <h2 className="border-b border-balticSea px-4 py-6 font-medium text-white">
            Select Token
          </h2>
          <ul className="mt-5 flex flex-col">
            {filteredOptions.map((option) => {
              return (
                <Option
                  onClick={() => {
                    onSelect(option);
                  }}
                  key={`${option.symbol}`}
                  isSelected={selectedSymbol === option.symbol}
                  option={option}
                />
              );
            })}
          </ul>
        </M.Content>
      </M.Overlay>
    </M>
  );
};
