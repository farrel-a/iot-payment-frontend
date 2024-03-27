import Navbar from "./Navbar"
import Log from "./pages/Log";
import Home from "./pages/Home";
import Ewallet from "./pages/Ewallet";
import { Route, Routes } from "react-router-dom";
function App() {

  return (
    <>
      <Navbar/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log" element={<Log />} />
          <Route path="/ewallet" element={<Ewallet />} />
        </Routes>
      </div>
    </>
  )
}
export default App;
