import { useState } from "react";

import { CurrencyLabel, CurrencyValue } from "entities/currency";
import { AppKitConnectWalletButton } from "features/connect-wallet";
import { Button } from "shared/ui/button";
import { Tab, Tabs } from "shared/ui/tabs";
import { TextGradient } from "shared/ui/text-gradient";
import { notifyError } from "shared/ui/toast";

export const Dev = () => {
  const [activeTab, setActiveTab] = useState(1);
  const handleToast = () => {
    notifyError("hello wrold");
  };
  return (
    <div>
      DEV PAGE
      <AppKitConnectWalletButton />
      <CurrencyValue symbol="ETH" value="0.12" />
      <CurrencyLabel symbol="ETH" />
      <Button onClick={handleToast}>HEllo world</Button>
      <Button disabled>world</Button>
      <Button isLoading>world</Button>
      <Tabs>
        <Tab isActive={activeTab === 1} onClick={() => setActiveTab(1)}>
          Hello
        </Tab>
        <Tab isActive={activeTab === 2} onClick={() => setActiveTab(2)}>
          World
        </Tab>
      </Tabs>
      <TextGradient>Hello world</TextGradient>
    </div>
  );
};
