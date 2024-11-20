import { useState } from "react";

import { useChainId } from "wagmi";

import { Currency, CurrencyLabel } from "entities/currency";
import { currenciesList, SelectCurrency } from "features/select-currency";
import { Header } from "pages/ui/layout";
import { Button } from "shared/ui/button";
import { Toggle } from "shared/ui/toggle";

import { TabType } from "./types";
import { Input } from "./ui/input";
import { TopControls } from "./ui/top-controls";

export const Mint = () => {
  const chainId = useChainId();
  const options = currenciesList.filter((c) => {
    return c.chainId === chainId;
  });

  const [isMintBentoPlus, setIsMintBentoPlus] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("mint");
  const [currency, setCurrency] = useState<Currency>(options[0]);
  const [payValue, setPayValue] = useState<string>();

  console.log(currency);

  return (
    <>
      <Header />
      <div className="mx-auto mt-20 w-1/3 rounded-2xl border border-white/10 bg-woodSmoke px-5 py-6">
        <h1 className="mb-4 flex justify-center text-center text-lg font-medium">
          Mint
        </h1>
        <TopControls
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onReloadClick={() => {}}
          onSettingsClick={() => {}}
          onSwitchBasketMode={() => {}}
        />
        <Input
          label="You Give"
          className="mt-2"
          slot={
            <SelectCurrency
              symbol="USDC"
              options={options}
              onChange={setCurrency}
            />
          }
          value={payValue}
          usdValue="0"
          balance={"20.2213"}
          onInputChange={setPayValue}
          decimals={6}
          onMaxClick={() => {
            console.log("hello world");
            //
          }}
        />
        <Input
          label="You Receive"
          className="mt-3"
          slot={<CurrencyLabel symbol="bentoUSD" />}
          value={payValue}
          usdValue="0"
          onInputChange={setPayValue}
          decimals={6}
        />

        <div className="mt-5 flex items-center justify-between">
          <span className="font-medium text-boulder">
            Select Network For Minting
          </span>
          <Button theme="mirage" className="ml-auto">
            Ethereum
          </Button>
        </div>

        <div className="mt-4 flex items-center">
          <span className="mr-auto inline-flex font-medium text-boulder">
            Mint BentoUSD+
          </span>
          <label className="flex cursor-pointer select-none items-center gap-x-2">
            <span className="inline-flex font-medium text-brightSun">
              {isMintBentoPlus ? "Yes" : "No"}
            </span>
            <Toggle
              className="shrink-0"
              checked={isMintBentoPlus}
              onChange={() => {
                setIsMintBentoPlus(!isMintBentoPlus);
              }}
            />
          </label>
        </div>

        <Button className="mt-6 w-full rounded-xl py-4 text-lg">
          Mint BentoUSD
        </Button>
      </div>
    </>
  );
};
