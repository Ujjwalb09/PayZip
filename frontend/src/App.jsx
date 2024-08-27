import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import SendMoney from "./components/SendMoney";
import OtpInputWithValidation from "./components/OtpValidation";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <div className="w-screen h-screen flex">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />}>
          <Route path="/signup/send-otp" element={<OtpInputWithValidation />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/send" element={<SendMoney />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
