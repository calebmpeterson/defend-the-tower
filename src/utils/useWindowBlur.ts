import { useEffect } from "react";

export const useWindowBlur = (onBlur: () => void): void => {
  useEffect(() => {
    const handleBlur = (): void => onBlur();

    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("blur", handleBlur);
    };
  }, [onBlur]);
};
