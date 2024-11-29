import { useState } from "react";

import { useSessionStorage } from "usehooks-ts";

import { Header } from "pages/ui/layout";

import { Mode, TabType } from "./types";
import { MintBasketModeForm } from "./ui/mint-basket-mode-form/mint-basket-mode-form";
import { MintSingleModeForm } from "./ui/mint-single-mode-form/mint-single-mode-form";
import { RedeemSingleModeForm } from "./ui/redeem-signle-mode-form/redeem-single-mode-form";
// import { RedeemBasketModeForm } from "./ui/redeem-basket-mode-form/redeem-basket-mode-form";
import { TopControls } from "./ui/top-controls";

export const Mint = () => {
  const [mode, setMode] = useSessionStorage<Mode>("bento:mode", "basket");
  const [activeTab, setActiveTab] = useState<TabType>("mint");

  return (
    <>
      <Header />
      <div className="mx-auto mt-8 w-1/3 min-w-[500px] rounded-2xl border border-white/10 bg-woodSmoke px-5 py-6">
        <h1 className="mb-4 flex justify-center text-center text-lg font-medium">
          Mint
        </h1>
        <TopControls
          activeTab={activeTab}
          mode={mode}
          onTabChange={setActiveTab}
          onReloadClick={() => {}}
          onSettingsClick={() => {}}
          onModeChange={setMode}
        />
        {activeTab === "mint" && mode === "single" && <MintSingleModeForm />}
        {activeTab === "mint" && mode === "basket" && <MintBasketModeForm />}
        {activeTab === "redeem" && mode === "single" && (
          <RedeemSingleModeForm />
        )}
        {/* {activeTab === "redeem" && mode === "basket" && (
          <RedeemBasketModeForm />
        )} */}
      </div>
    </>
  );
};
