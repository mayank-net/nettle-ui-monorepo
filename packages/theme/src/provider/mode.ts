import React, { useContext } from "react";

export type ThemeMode = "light" | "dark";

export const InitialState: ThemeMode = "dark";

export type ThemeModeContextType = {
  state: ThemeMode;
  setState: (newState: ThemeMode) => void;
};

export const ThemeModeContext = React.createContext<ThemeModeContextType>({
  state: InitialState,
  setState: () => {
    return;
  },
});

export function useThemeMode(): [
  ThemeMode,
  (newState: Partial<ThemeMode>) => void
] {
  const { state, setState } = useContext(ThemeModeContext);

  const setThemeMode = (newState: ThemeMode): void => {
    setState(newState);
    // makeshift arrangement
    localStorage.setItem("themeModeFromStorage", newState);
  };

  return [state, setThemeMode];
}
