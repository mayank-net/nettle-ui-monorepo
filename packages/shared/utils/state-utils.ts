import React, { Dispatch, SetStateAction } from "react";

type ModuleContext<T> = {
  state: T;
  setState: Dispatch<SetStateAction<T>>;
};

export function mergeState<T>(state: T, newState: Partial<T>): T {
  return Object.assign(
    {},
    Object.assign(state as Record<string, unknown>, newState as T)
  );
}

export function createStateContext<T>(
  initialState: T
): React.Context<ModuleContext<T>> {
  return React.createContext<ModuleContext<T>>({
    state: initialState,
    setState: () => {
      return;
    },
  });
}
