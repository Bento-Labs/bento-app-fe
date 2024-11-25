import { useState } from "react";

import { useSessionStorage } from "usehooks-ts";

import { Header } from "pages/ui/layout";

import { Mode, TabType } from "./types";
import { BasketModeForm } from "./ui/basket-mode-form/basket-mode-form";
import { SingleModeForm } from "./ui/single-mode-form/single-mode-form";
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
        {mode === "single" && <SingleModeForm />}
        {mode === "basket" && <BasketModeForm />}
      </div>
    </>
  );
};
