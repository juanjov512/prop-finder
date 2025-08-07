"use client";

import { createGlobalStyle } from "styled-components";
import { theme } from "@/lib/theme";

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof theme.colors;
    spacing: typeof theme.spacing;
    borderRadius: typeof theme.borderRadius;
    fonts?: {
      geistSans?: string;
      geistMono?: string;
    };
  }
}

export const GlobalStyle = createGlobalStyle`
  :root {
    --font-geist-sans: ${({ theme }) => theme.fonts?.geistSans || 'sans-serif'};
    --font-geist-mono: ${({ theme }) => theme.fonts?.geistMono || 'monospace'};
  }

  html {
    font-size: 16px;
    line-height: 1.5;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: ${({ theme }) => theme.colors.gray[50]};
    color: ${({ theme }) => theme.colors.gray[900]};
  }

  * {
    box-sizing: border-box;
  }
`;
