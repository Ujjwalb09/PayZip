import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import SendMoney from "./components/templates/SendMoney";
import OtpInputWithValidation from "./components/OtpValidation";
import LandingPage from "./components/LandingPage";
import Edit from "./components/Edit";
import ContactUs from "./components/ContactUs";
import { Analytics } from "@vercel/analytics/react";
import DeleteAccount from "./components/templates/DeleteAccount";
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
          <Route path="/dashboard/edit" element={<Edit />} />
          <Route path="/dashboard/delete-account" element={<DeleteAccount />} />
        </Route>
        <Route path="/contactUs" element={<ContactUs />} />
      </Routes>
      <Analytics />
    </div>
  );
}

export default App;
