// App.js

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./theme-light.css";
import Home from "./Components/Pages/Home/Home";
import Example from "./Components/Pages/Example/Example";
import Contact from "./Components/Pages/Contact/Contact";
import FAQS from "./Components/Pages/FAQS/FAQS";
import Project from "./Components/Pages/Project/Project";
import Services from "./Components/Pages/Services/Services";
import About from "./Components/Pages/About/About";
import { ContextState } from "./Context/Content/ContentState";
import { ThemeProvider } from "./Context/ThemeContext";
import { useWebsiteAnalytics } from "./Components/util/useWebsiteAnalytics";

function AppRoutes() {
  // useWebsiteAnalytics();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/example" element={<Example />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faqs" element={<FAQS />} />
      <Route path="/project" element={<Project />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <ContextState>
          <AppRoutes />
        </ContextState>
      </ThemeProvider>
    </Router>
  );
}

export default App;
