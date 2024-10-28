import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";

import ProtectedRoutes from "./routes/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
  return (
    <Routes>
      <Route element={<NotFound />} path="*" />

      <Route element={<PublicRoutes />}>
        <Route element={<Home />} path="/" />
        <Route element={<SignUp />} path="/sign-up" />
        <Route element={<SignIn />} path="/sign-in" />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route element={<Dashboard />} path="/dashboard" />
      </Route>
    </Routes>
  );
}

export default App;
