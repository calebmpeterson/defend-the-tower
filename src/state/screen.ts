import { useEffect } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { Size } from "../types";

export const screenState = atom<Size>({
  key: "screen",
  default: { width: 1, height: 1 },
});

export const useInitializeScreen = (sceneElement: HTMLDivElement | null) => {
  const setSize = useSetRecoilState(screenState);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const [entry] = entries;
      const { contentRect } = entry;

      setSize({
        width: contentRect.width,
        height: contentRect.height,
      });
    });

    if (sceneElement) {
      observer.observe(sceneElement);

      return () => {
        observer.unobserve(sceneElement);
      };
    }
  }, [setSize, sceneElement]);
};

export const useScreen = () => useRecoilValue(screenState);
