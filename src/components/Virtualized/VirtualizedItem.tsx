import React from "react";
import { virtualizedListClasses } from "./VirtualizedList";

export type VirtualizedItemProps = {
  top: string;
  children: React.ReactNode;
};

function VirtualizedItem(props: VirtualizedItemProps) {
  return (
    <li
      className={virtualizedListClasses.item}
      style={{
        top: props.top,
      }}
    >
      {props.children}
    </li>
  );
}

export default VirtualizedItem;
