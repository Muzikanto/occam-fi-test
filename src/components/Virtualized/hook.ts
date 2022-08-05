import React from "react";

export type UseVirtualizedArgs = {
  total: number;
  itemHeight: number;
  spaceItems?: number;
};
export type VirtualizeInstance = {
  containerRef: React.MutableRefObject<HTMLUListElement | null>;
  totalHeight: number;
  displayRange: [number, number];
  offsetItem: number;
  scrollTo: (index: number) => void;
};

function useVirtualized({
  total,
  itemHeight,
  spaceItems = 4,
}: UseVirtualizedArgs): VirtualizeInstance {
  const containerRef = React.useRef<HTMLUListElement | null>(null);
  const [scrollTop, setScrollTop] = React.useState<number>(0);
  const [listHeight, setListHeight] = React.useState<number>(0);

  const totalHeight = total * itemHeight;
  const offsetItem = Math.max(
    Math.ceil(scrollTop / itemHeight) - spaceItems,
    0
  );
  const displaySize = Math.ceil(listHeight / itemHeight) + spaceItems * 2;
  const displayRange = [offsetItem, offsetItem + displaySize] as [
    number,
    number
  ];

  const scrollTo = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: index * itemHeight });
    }
  };

  React.useEffect(() => {
    const element = containerRef.current;

    if (element) {
      setListHeight(element.offsetHeight);

      const onScroll = (e: Event) => {
        setScrollTop((e.target as Element).scrollTop);
      };

      element.addEventListener("scroll", onScroll);

      return () => {
        element.removeEventListener("scroll", onScroll);
      };
    }

    return () => {};
  }, []);

  return {
    containerRef,
    totalHeight,
    displayRange,
    offsetItem,
    scrollTo,
  };
}

export default useVirtualized;
