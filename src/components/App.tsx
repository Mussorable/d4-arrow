import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./header/Header";
import Home from "./main/home/Home";
import Classes from "./main/classes/Classes";
import Builds from "./main/builds/Builds";
import SkillsCalculator from "./main/calculator/SkillsCalculator";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="classes" element={<Classes />} />
          <Route path="builds" element={<Builds />} />
          <Route path="skills-calculator" element={<SkillsCalculator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
