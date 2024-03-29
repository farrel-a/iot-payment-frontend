import Navbar from "./Navbar"
import Log from "./pages/Log";
import Home from "./pages/Home";
import Topup from "./pages/Topup";
import { Route, Routes } from "react-router-dom";
function App() {

  return (
    <>
      <Navbar/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topup" element={<Topup />} />
          <Route path="/log" element={<Log />} />
        </Routes>
      </div>
    </>
  )
}
export default App;
