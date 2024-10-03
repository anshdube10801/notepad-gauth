import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";


function App() {
  return <>

  <BrowserRouter>
  <Routes>
  <Route path="/" element={<Login />}/>
  <Route path="/signup" element={<Signup />}/>
</Routes>
 </BrowserRouter>
  </>;
}

export default App;
