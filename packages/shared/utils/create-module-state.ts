import React, { useContext } from "react";
import { create } from "zustand";

// Types
export type KeyedModuleState<T> = { state: Map<string, T> };

export interface StoreInitializerType<T> {
  key: string;
  initialState?: Partial<T>;
}

export type ResetModuleState = () => void;
export type DeleteModuleState = () => void;

/**
 * Function to update module state. If stateOrCallback is a function, it is
 * passed the latest value of state, and returned value is used as new state.
 *
 * If stateOrCallback is an object, it is merged with the existing state
 */
export type SetModuleState<T> = (
  stateOrCallback: Partial<T> | ((prevState: T) => T)
) => void;

export type UseModuleState<T> = {
  /**
   * Returns entire module state. Any change in single property of module state
   * will cause re-render of component using the hook or a derived hook
   **/
  (): [T, SetModuleState<T>, ResetModuleState, DeleteModuleState];

  /**
   * Returns entire module state for specified store key. setModuleState updates
   * state for that specific key
   * Any change in single property of module state, will cause re-render of component
   * using the hook or a derived hook
   **/
  (storeKey: string): [
    T,
    SetModuleState<T>,
    ResetModuleState,
    DeleteModuleState
  ];

  /**
   * Returns only specified keys from module state. Only change in specified keys
   * will cause re-render of component using the hook or a derived hook
   *
   * If a property in moduleState is an object, you can pass key as an array
   * with first element as the key and second element as the key of the property
   *
   * For example, { a: { b: 1, c: 2, d: 3 } }, you can pass ['a', 'b'] to get only b
   * from moduleState like { a: { b: 1 } }. If you pass ['a', 'b'] and ['a', 'c'], you will get
   * { a: { b: 1, c: 2 } }
   **/
  <K extends keyof T>(keys: (K | [K, keyof T[K]])[]): [
    T,
    SetModuleState<T>,
    ResetModuleState,
    DeleteModuleState
  ];

  /**
   * Returns only specified keys from module state for specified store key.
   * setModuleState updates state for that specific key
   * Only change in specified keys will cause re-render of component using the hook
   * or a derived hook
   **/
  <K extends keyof T>(storeKey: string, keys: (K | [K, keyof T[K]])[]): [
    T,
    SetModuleState<T>,
    ResetModuleState,
    DeleteModuleState
  ];
};

export function createModuleState<T extends Record<string, unknown>>(
  InitialState: T
): {
  useModuleState: UseModuleState<T>;
  StoreInitializerContext: React.Context<StoreInitializerType<T>>;
} {
  const useStore = create<KeyedModuleState<T>>(() => {
    return { state: new Map() }; // returns an empty object
  });

  /**
   * All module states are keyed by a string. Use this context to pass the key
   * for automatic extraction in hooks. If no key is passed, the key is set to
   * `default`. So, if a store doesn't need to keyed by multiple keys,
   * you can skip wrapping corresponding components in `StateKeyContext.Provider`
   *
   * You can also pass an optional `initialState` to the context to set some parameters
   * in the state for usage in during first render cycle of component. For example, params from
   * routes or query params
   *
   * Example:
   */
  const StoreInitializerContext = React.createContext<StoreInitializerType<T>>({
    key: "default",
  });

  function useStoreInitializer(): StoreInitializerType<T> {
    const value = useContext(StoreInitializerContext);
    return value;
  }

  function useModuleState<T>(): [
    T,
    SetModuleState<T>,
    ResetModuleState,
    DeleteModuleState
  ];
  function useModuleState<T>(
    storeKey: string
  ): [T, SetModuleState<T>, ResetModuleState, DeleteModuleState];

  function useModuleState<K extends keyof T>(
    keys: (K | [K, keyof T[K]])[]
  ): [
    { [key in K[][number]]: T[K[][number]] },
    SetModuleState<T>,
    ResetModuleState,
    DeleteModuleState
  ];

  function useModuleState<K extends keyof T>(
    storeKey: string,
    keys: (K | [K, keyof T[K]])[]
  ): [
    { [key in K[][number]]: T[K[][number]] },
    SetModuleState<T>,
    ResetModuleState,
    DeleteModuleState
  ];

  function useModuleState<K extends keyof T>(
    keysOrStoreKey?: (K | [K, keyof T[K]])[] | string,
    keys?: (K | [K, keyof T[K]])[]
  ): [
    T | { [key in K[][number]]: T[K[][number]] },
    SetModuleState<T>,
    ResetModuleState,
    DeleteModuleState
  ] {
    const { key: keyFromContext, initialState = {} } = useStoreInitializer();
    let selectionKeys: (K | [K, keyof T[K]])[] = [];
    let finalStoreKey = keyFromContext;

    if (Array.isArray(keysOrStoreKey)) {
      selectionKeys = keysOrStoreKey;
    } else {
      selectionKeys =
        keys || (Object.keys(InitialState) as (K | [K, keyof T[K]])[]);
      finalStoreKey = keysOrStoreKey || keyFromContext;
    }

    const storeState = useStore((state) => state.state.get(finalStoreKey));

    // If not initialized yet, fallback once.
    const currentState = storeState ?? {
      ...InitialState,
      ...initialState,
    };

    const state =
      selectionKeys.length === 0
        ? currentState
        : selectionKeys.reduce(
            (acc, key) => {
              if (Array.isArray(key)) {
                acc[key[0]] =
                  acc[key[0]] && typeof acc[key[0]] === "object"
                    ? ({
                        ...(acc[key[0]] as object),
                        [key[1] as keyof T[K]]: currentState[key[0]][key[1]],
                      } as T[K])
                    : ({
                        [key[1] as keyof T[K]]: currentState[key[0]][key[1]],
                      } as T[K]);
              } else {
                acc[key] = currentState[key];
              }
              return acc;
            },
            {} as {
              [key in K[][number]]: T[K[][number]];
            }
          );

    const setModuleState = (
      stateOrCallback: Partial<T> | ((prevState: T) => T)
    ): void => {
      if (typeof stateOrCallback === "function") {
        useStore.setState((state) => {
          const currentState = state.state.get(finalStoreKey) || {
            ...InitialState,
            ...initialState,
          };
          const newState = stateOrCallback(currentState as T);

          return {
            state: new Map(state.state).set(finalStoreKey, {
              ...currentState,
              ...newState,
            }),
          };
        });
        return; // <=== important
      }

      if (
        Object.keys(stateOrCallback).length === Object.keys(InitialState).length
      ) {
        console.warn(
          "useModuleState: pass only updated keys, passing entire moduleState can result in old state variables overwriting latest values"
        );
      }

      useStore.setState((state) => {
        const currentState = state.state.get(finalStoreKey) || {
          ...InitialState,
          ...initialState,
        };
        return {
          state: new Map(state.state).set(finalStoreKey, {
            ...currentState,
            ...stateOrCallback,
          }),
        };
      });
    };

    function resetModuleState(): void {
      useStore.setState((state) => ({
        state: new Map(state.state).set(finalStoreKey, {
          ...InitialState,
          ...initialState,
        }),
      }));
    }

    function deleteModuleState(): void {
      useStore.setState((state) => {
        const newStore = new Map(state.state);
        newStore.delete(finalStoreKey);

        return {
          state: newStore,
        };
      });
    }

    return [state, setModuleState, resetModuleState, deleteModuleState];
  }

  return {
    useModuleState,
    StoreInitializerContext,
  };
}
