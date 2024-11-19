import { twMerge } from "tailwind-merge";

import { Button } from "shared/ui/button";
import { Icon } from "shared/ui/icon";
import { Tab, Tabs } from "shared/ui/tabs";
import { TextGradient } from "shared/ui/text-gradient";

import { TabType } from "../types";

type Props = {
  className?: string;
  activeTab: TabType;
  onTabChange: (activeTab: TabType) => void;
  onSwitchBasketMode: () => void;
  onReloadClick: () => void;
  onSettingsClick: () => void;
};

export const TopControls = (props: Props) => {
  const {
    className,
    activeTab,
    onTabChange,
    onSwitchBasketMode,
    onReloadClick,
    onSettingsClick,
  } = props;
  return (
    <div className={twMerge("flex items-center", className)}>
      <Tabs className="h-10">
        <Tab
          className="text-xs"
          isActive={activeTab === "mint"}
          onClick={() => onTabChange("mint")}
        >
          <Icon name="plus" className="size-4" />
          Mint
        </Tab>
        <Tab
          className="text-xs"
          isActive={activeTab === "redeem"}
          onClick={() => onTabChange("redeem")}
        >
          <Icon name="minus" className="size-4" />
          Redeem
        </Tab>
      </Tabs>

      <Button
        className="ml-auto h-10 gap-x-2"
        theme="mirage"
        onClick={onSwitchBasketMode}
      >
        <Icon name="switch" className="size-4" />
        <TextGradient>Basket Mode</TextGradient>
      </Button>
      <Button className="ml-1 size-10" theme="mirage" onClick={onReloadClick}>
        <Icon name="reload" className="size-4" />
      </Button>
      <Button className="ml-1 size-10" theme="mirage" onClick={onSettingsClick}>
        <Icon name="settings" className="size-4" />
      </Button>
    </div>
  );
};
