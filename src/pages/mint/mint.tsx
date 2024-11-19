import { useState } from "react";

import { Header } from "pages/ui/layout";
import { Button } from "shared/ui/button";
import { Icon } from "shared/ui/icon";
import { Tab, Tabs } from "shared/ui/tabs";
import { TextGradient } from "shared/ui/text-gradient";

export const Mint = () => {
  const [activeTab, setActiveTab] = useState<"mint" | "redeem">("mint");

  return (
    <>
      <Header />
      <div className="mx-auto w-1/2 rounded-2xl border border-white/10 bg-woodSmoke px-5 py-6">
        <h1 className="flex justify-center text-center text-lg font-medium">
          Mint
        </h1>
        <div className="flex items-center">
          <Tabs className="h-10">
            <Tab
              className="text-xs"
              isActive={activeTab === "mint"}
              onClick={() => setActiveTab("mint")}
            >
              <Icon name="plus" className="size-4" />
              Mint
            </Tab>
            <Tab
              className="text-xs"
              isActive={activeTab === "redeem"}
              onClick={() => setActiveTab("redeem")}
            >
              <Icon name="minus" className="size-4" />
              Redeem
            </Tab>
          </Tabs>

          <Button className="ml-auto h-10" theme="mirage">
            <TextGradient>Basket Mode</TextGradient>
          </Button>
          <Button className="ml-1 size-10" theme="mirage">
            <Icon name="reload" className="size-4" />
          </Button>
          <Button className="ml-1 size-10" theme="mirage">
            <Icon name="settings" className="size-4" />
          </Button>
        </div>
        <form></form>
      </div>
    </>
  );
};
