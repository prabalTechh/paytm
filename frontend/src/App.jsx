import { BrowserRouter, Routes, Route } from "react-router-dom"; // Fixed import
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Send from "./pages/Send";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Added a default route */}
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<Send />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;