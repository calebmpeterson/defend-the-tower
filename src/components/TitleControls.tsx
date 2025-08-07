import { mdiNetworkPos } from "@mdi/js";
import { FC, memo } from "react";
import Header from "./Header";

const TitleControls: FC = () => {
  return (
    <div>
      <Header iconPath={mdiNetworkPos}>Packet Swarm</Header>
    </div>
  );
};

export default memo(TitleControls);
