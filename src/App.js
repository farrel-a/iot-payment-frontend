import Navbar from "./Navbar"
import Home from "./pages/Home";
import PaymentLog from "./pages/PaymentLog";
import { Route, Routes } from "react-router-dom";
function App() {

  return (
    <>
      <Navbar/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/payment_log" element={<PaymentLog/>} />
        </Routes>
      </div>
    </>
  )
}
export default App;
