import { useAuth } from "@/hooks/useAuth";
import DefaultLayout from "@/layouts/DefaultLayout";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Home from "@/pages/User/Home";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  const { user } = useAuth();
  const isLogged = !!user;

  return (
    <Routes>
      {!isLogged ? (
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      ) : (
        <Route path="/" element={<DefaultLayout active />}>
          <Route path="/home" element={<Home />} />
        </Route>
      )}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default Router;
