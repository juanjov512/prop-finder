import type { DefaultTheme } from "styled-components";
import { theme } from "../lib/theme";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: typeof theme.colors;
    borderRadius: typeof theme.borderRadius;
  }
}
