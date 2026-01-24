import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Pages/Home/Home";
import Process from "./Components/Pages/Process/Process";
import Example from "./Components/Pages/Example/Example";
import Contact from "./Components/Pages/Contact/Contact";
import FAQS from "./Components/Pages/FAQS/FAQS";
import Project from "./Components/Pages/Project/Project";
// import AlertList from "./Components/util/Alert/AlertList";
import { ContextState } from "./Context/Content/ContentState";

function App() {
  return (
    <Router>
      <ContextState>
        {/* <AlertList /> */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/process" element={<Process />} />
          <Route path="/example" element={<Example />} />
          {/* <Route path='/packages' element={<Packages />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<FAQS />} />
          <Route path="/project" element={<Project />} />
        </Routes>
      </ContextState>
    </Router>
  );
}

export default App;
