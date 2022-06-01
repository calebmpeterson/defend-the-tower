import { FC, memo } from "react";
import { mdiChessRook } from "@mdi/js";
import Header from "./Header";

const TitleControls: FC = () => {
  return (
    <div>
      <Header iconPath={mdiChessRook}>Defend the Tower</Header>
      <div style={{ textAlign: "center" }}>
        <small>Press ESCAPE to pause</small>
      </div>
    </div>
  );
};

export default memo(TitleControls);
