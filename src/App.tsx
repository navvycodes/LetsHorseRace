import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./components/Home";
import { LocalPlayWrapper } from "./LocalPlay/LocalPlay";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/local-play" element={<LocalPlayWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
