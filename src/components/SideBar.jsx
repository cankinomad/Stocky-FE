import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function SideBar({setDeger}) {
  const navigate = useNavigate();

  function handleClick(number) {
    switch (number) {
      case 1:
        navigate("/main-page");
        setDeger("main")
        break;
      case 2:
        navigate("/main-page/product-page");
        setDeger("productPage")
        break;
      case 3:
        navigate("/main-page/category-page");
        setDeger("categoryPage")
        break;
      case 4:
        navigate("/main-page/unit-page");
        setDeger("unitPage")
        break;
      case 5:
        navigate("/main-page/storage-page");
        setDeger("storagePage")
        break;
      case 6:
        navigate("/main-page/update-profile-page");
        setDeger("updateProf")
        break;
      case 7:
        navigate("/");
        sessionStorage.removeItem("token")
        break;
      default:
        break;
    }
  }

  return (
    <div className="d-flex flex-column flex-shrink-0 p-5 bg-light bg-opacity-50 vh-100">
      <nav>
        <NavLink onClick={()=>handleClick(1)} className=" text-decoration-none logo text-center ">
          <h1 className="logo">
            <i className="fa-solid fa-boxes-stacked logo"></i> Stocky
          </h1>
        </NavLink>
      </nav>
      <hr className="logo" />
      <ul className="stocky-sidebar mb-auto flex-column mt-2">
        <li onClick={() => handleClick(1)}>
          <i className="fa-solid fa-box me-1"></i> Tüm Ürünler
        </li>
        <li onClick={() => handleClick(2)}>
          <i className="fa-solid fa-gear me-1"></i> Ürün İşlemleri
        </li>
        <li onClick={() => handleClick(3)}>
          <i className="fa-solid fa-list me-1"></i> Kategori İşlemleri
        </li>
        <li onClick={() => handleClick(4)}>
          <i className="fa-solid fa-sack-xmark me-1"></i> Birim İşlemleri
        </li>
        <li onClick={() => handleClick(5)}>
          <i className="fa-solid fa-warehouse me-1"></i> Depo İşlemleri
        </li>
      </ul>
      <hr className="logo" />
      <div
        className="profil d-flex justify-content-center"
        onClick={() => handleClick(6)}
      >
        <a
          href="#"
          className="d-flex align-items-center link-dark text-decoration-none"
        >
          <img
            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
            width={32}
            height={32}
            className="rounded-circle me-2"
            alt="Avatar"
          />
          <strong>Profil</strong>
        </a>
      </div>
      <a href="" className="logout text-center mt-4">
        <small onClick={() => handleClick(7)}>
          <i className="fa-solid fa-right-from-bracket me-1"></i> Oturumu Kapat
        </small>
      </a>
    </div>
  );
}
