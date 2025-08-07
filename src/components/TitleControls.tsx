import { mdiChessRook } from "@mdi/js";
import { FC, memo } from "react";
import Header from "./Header";

const TitleControls: FC = () => {
  return (
    <div>
      <Header iconPath={mdiChessRook}>Defend the Tower</Header>
    </div>
  );
};

export default memo(TitleControls);
