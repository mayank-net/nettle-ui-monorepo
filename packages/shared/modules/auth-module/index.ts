import { useGlobalState } from "shared/global-state";

export function useAuth() {
  const [{ isLoggedIn }, setGlobalState] = useGlobalState(["isLoggedIn"]);

  const setIsLoggedIn = (value: boolean) => {
    setGlobalState({ isLoggedIn: value });
  };

  const logoutUser = () => {
    setGlobalState({ isLoggedIn: false });
  };

  return {
    isLoggedIn,
    setIsLoggedIn,
    logoutUser,
  };
}
