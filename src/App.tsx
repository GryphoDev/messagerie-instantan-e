import { Header } from "./containers/header";
import { Login } from "./pages/login";
import { ProtectedRoute } from "./services/protectedRoute";
import { Home } from "./pages/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register } from "./pages/register";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
