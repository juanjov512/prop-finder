import React from "react";
import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { CollapsibleContainer, CollapsibleContent } from "./styles";
import { ICollapsibleProps } from "./types";

const Collapsible: React.FC<ICollapsibleProps> = ({
  isOpen,
  children,
  className,
  style,
}) => {
  return (
    <RadixCollapsible.Root open={isOpen}>
      <CollapsibleContainer className={className} style={style}>
        <RadixCollapsible.Content asChild>
          <CollapsibleContent>{children}</CollapsibleContent>
        </RadixCollapsible.Content>
      </CollapsibleContainer>
    </RadixCollapsible.Root>
  );
};

export default Collapsible;
