import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./views/Home/Home";
import Admin from "./views/Admin";
import Owner from "./views/Owner";
import Login from "./views/Login";
import Repair from "./views/Repair";
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/admin" element={<Admin/>}/>
          <Route exact path="/owner" element={<Owner/>}/>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/repair" element={<Repair />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
