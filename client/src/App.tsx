import { BrowserRouter } from "react-router-dom";

import Router from "./routes/routes";

import AuthProvider from "./context/authContext";
import { SidebarProvider } from "./context/sidebarContext";
import { AppThemeProvider } from "./context/themeContext";

function App() {
  return (
    <AppThemeProvider>
      <SidebarProvider>
        <AuthProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </AuthProvider>
      </SidebarProvider>
    </AppThemeProvider>
  );
}

export default App;
