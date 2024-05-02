import {Routes, Route} from 'react-router-dom';
import './App.css';
import Home from "./routes/Home";
import SignIn from "./routes/SignIn";
import Toilets from "./routes/Toilets";
import SignUp from "./routes/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/toilets" element={<Toilets/>}/>
      </Routes>
    </>
  );
}

export default App;
