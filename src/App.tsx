import {  Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import MainLayout from "./layouts/Mainlayout";
import About from "./pages/About";

function App() {
  return (
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/about" element={<MainLayout><About /></MainLayout>}></Route>
        <Route path="/details/:id" element={<MainLayout><Details /></MainLayout>} />
      </Routes>
  );
}

export default App;