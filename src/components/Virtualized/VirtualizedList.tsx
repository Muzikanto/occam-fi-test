import React from "react";
import styled from "@emotion/styled";
import clsx from "clsx";
import VirtualizedItem from "./VirtualizedItem";
import useVirtualized, { VirtualizeInstance } from "./hook";

const PREFIX = "VirtualizedList";
export const virtualizedListClasses = {
  root: `${PREFIX}-root`,
  last: `${PREFIX}-last`,
  item: `${PREFIX}-item`,
};

const StyledList = styled("ul")(() => ({
  overflow: "auto",
  position: "relative",
  scrollBehavior: 'smooth',

  [`& > .${virtualizedListClasses.item}`]: {
    position: "absolute",
    listStyle: "none",
  },
  [`& > .${virtualizedListClasses.last}`]: {
    position: "absolute",
    opacity: 0,
    transform: "translateY(-100%)",
    pointerEvents: "none",
    userSelect: "none",
  },
}));

export type VirtualizedListProps<T> = {
  options: T[];
  itemHeight: number;
  spaceItems?: number;
  renderOption?: (item: T, index: number) => React.ReactNode;
} & JSX.IntrinsicElements["ul"];

function VirtualizedList<T>(
  props: VirtualizedListProps<T>,
  ref:
    | React.MutableRefObject<VirtualizeInstance | null | undefined>
    | null
    | ((inst: VirtualizeInstance | null | undefined) => void)
) {
  const { options, renderOption, className, itemHeight, spaceItems, ...other } =
    props;
  const renderItem = props.renderOption || ((item: T) => JSON.stringify(item));

  const list = useVirtualized({
    total: options.length,
    itemHeight,
    spaceItems,
  });
  const childrenToDisplay = options.slice(...list.displayRange);

  // ref
  if (ref) {
    if (typeof ref == "object") {
      ref.current = list;
    } else {
      ref(list);
    }
  }

  return (
    <StyledList
      ref={(r) => (list.containerRef.current = r)}
      {...other}
      className={clsx(virtualizedListClasses.root, className)}
    >
      {childrenToDisplay.map((el, i) => {
        const index = i + list.offsetItem;

        return (
          <VirtualizedItem
            key={`item-${i}`}
            top={`${itemHeight * i + list.offsetItem * itemHeight}px`}
          >
            {renderItem(el, index)}
          </VirtualizedItem>
        );
      })}

      <div
        className={virtualizedListClasses.last}
        style={{
          top: `${list.totalHeight}px`,
        }}
      >
        last
      </div>
    </StyledList>
  );
}

export default React.forwardRef(VirtualizedList);
