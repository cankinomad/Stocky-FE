import { Outlet, Navigate } from "react-router";
import { jwtDecode } from "jwt-decode";

export  function ProtectedRoute(){

    const token = sessionStorage.getItem("token");
  console.log(jwtDecode(token))
      try {
        const deger= jwtDecode(token);
      return   (deger.iss != null && deger.iss === "basarsoft" ) ? <Outlet /> : <Navigate to="/"/>;
      } catch (error) {
        sessionStorage.removeItem("token")
       return  <Navigate to="/"/>
      }
}
