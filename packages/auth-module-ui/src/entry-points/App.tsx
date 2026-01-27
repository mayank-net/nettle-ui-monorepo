import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../routes";
import { QueryClientProvider } from "react-query";
import { StoreInitializerContext } from "shared/global-state";
import queryClient from "shared/network";
import ThemeProvider from "theme/src/provider";

import { ToastContainer } from "react-toastify";

function App(): JSX.Element {
  return (
    <React.StrictMode>
      <StoreInitializerContext.Provider
        value={{
          key: "global",
        }}
      >
        <ThemeProvider defaultMode={"dark"}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <ToastContainer />
              <AppRoutes />
            </BrowserRouter>
          </QueryClientProvider>
        </ThemeProvider>
      </StoreInitializerContext.Provider>
    </React.StrictMode>
  );
}

export default App;
