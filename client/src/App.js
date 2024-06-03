import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";
import Home from "./pages/Home";
import Rent from "./pages/Rent";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainContextProvider from "./ContextAPI";
import NewPorperty from "./pages/NewPorperty";
import ShowProperty from "./pages/ShowProperty";
import Profile from "./pages/Profile";

function App() {
  return (
    <MainContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/show-property" element={<ShowProperty />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/new-property" element={<NewPorperty />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </MainContextProvider>
  );
}

export default App;
