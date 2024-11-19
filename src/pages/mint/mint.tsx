import { useState } from "react";

import { CurrencyLabel } from "entities/currency";
import { SelectCurrency } from "features/select-currency";
import { Header } from "pages/ui/layout";

import { TabType } from "./types";
import { Input } from "./ui/input";
import { TopControls } from "./ui/top-controls";

export const Mint = () => {
  const [activeTab, setActiveTab] = useState<TabType>("mint");
  const [payValue, setPayValue] = useState<string>();

  return (
    <>
      <Header />
      <div className="mx-auto w-1/2 rounded-2xl border border-white/10 bg-woodSmoke px-5 py-6">
        <h1 className="flex justify-center text-center text-lg font-medium">
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
              options={[]}
              onChange={() => {
                //
              }}
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
      </div>
    </>
  );
};
