import React, { useState, Fragment } from "react";
import { Theme } from "theme/src/types";
import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import theme from "../index";
import { ThemeMode, ThemeModeContext } from "./mode";

interface Props {
  defaultMode: "light" | "dark" | null | undefined;
  children: React.ReactNode;
}

const Provider = ({ defaultMode, children }: Props): JSX.Element => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(defaultMode || "dark");

  useEffect(() => {
    if (defaultMode) {
      setThemeMode(defaultMode as ThemeMode);
    }
  }, [defaultMode]);

  return (
    <ThemeModeContext.Provider
      value={{ state: themeMode, setState: setThemeMode }}
    >
      <ThemeProvider
        theme={(themeParent: Theme) => ({
          ...themeParent,
          ...theme,
          themeMode,
        })}
      >
        <Fragment>{children}</Fragment>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default Provider;

export * from "./mode";
