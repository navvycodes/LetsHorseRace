import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./Home/Home";
import { LocalPlayWrapper } from "./LocalPlay/LocalPlay";
import { ComingSoon } from "./ComingSoon/ComingSoon";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/local-play" element={<LocalPlayWrapper />} />
        <Route path="/online-play" element={<ComingSoon />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
