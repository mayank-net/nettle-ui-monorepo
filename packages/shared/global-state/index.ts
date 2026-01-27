import { createModuleState } from "shared/utils/create-module-state";

export type GlobalState = {
  isLoggedIn: boolean;
};

export const InitialState: GlobalState = {
  isLoggedIn: false,
};

const { useModuleState: useGlobalState, StoreInitializerContext } =
  createModuleState<GlobalState>(InitialState);

export { useGlobalState, StoreInitializerContext };
