import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/authContext";
import { AppThemeProvider } from "./context/themeContext";
import Router from "./routes/routes";
import { SidebarProvider } from "./context/sidebarContext";

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
