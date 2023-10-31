import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/authContext";
import Router from "./routes/routes";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
