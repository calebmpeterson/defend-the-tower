import { FC } from "react";

const DevTools: FC = () => {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return null;
};

export default DevTools;
