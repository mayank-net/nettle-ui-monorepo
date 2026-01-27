import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../routes";
import { StoreInitializerContext } from "shared/global-state";
import ThemeProvider from "theme/src/provider";

function App(): JSX.Element {
  return (
    <React.StrictMode>
      <StoreInitializerContext.Provider
        value={{
          key: "global",
        }}
      >
        <ThemeProvider defaultMode={"dark"}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ThemeProvider>
      </StoreInitializerContext.Provider>
    </React.StrictMode>
  );
}

export default App;
