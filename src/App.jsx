import "./App.css";
import { Route, Routes } from "react-router";
import { Login } from "./pages/Login/login";
import { Register } from "./pages/Register/register";
import { MainPage } from "./pages/MainPage/mainPage";
import { ProtectedRoute } from "./pages/Security/ProtectedRoute";
import { useState } from "react";


function App() {

  const[deger,setDeger]=useState("main")

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
      
      <Route path='/main-page' element={<ProtectedRoute/>}>
        <Route path='' element={<MainPage deger={deger} setDeger={setDeger} />} />
        <Route path='update-profile-page' element={<MainPage deger={deger} setDeger={setDeger} />} />
        <Route path='unit-page' element={<MainPage deger={deger} setDeger={setDeger}/>} />
        <Route path='storage-page' element={<MainPage deger={deger} setDeger={setDeger}/>} />
        <Route path='category-page' element={<MainPage deger={deger} setDeger={setDeger}/>} />
        <Route path='product-page' element={<MainPage deger={deger} setDeger={setDeger}/>} />
        
     </Route> 
     
      </Routes>
    </>
  );
}

export default App;
