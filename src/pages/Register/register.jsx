import { useState } from "react";
import AuthService from "../../services/AuthService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from "react-router-dom";
import { StockyButton } from "../../components/StockyButton";

export function Register() {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column vh-100">
      <header className="d-flex align-items-start mx-4 my-2">
        <nav>
          <NavLink to="/" className=" text-decoration-none text-light logo">
            <h1 className="logo">
              <i className="fa-solid fa-boxes-stacked logo"></i> Stocky
            </h1>
          </NavLink>
        </nav>
      </header>
      <main className="d-flex justify-content-center align-items-center">
        <RegisterFrm />
      </main>
      <footer></footer>
    </div>
  );
}

function RegisterFrm() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    rePassword: "",
  });
  const navigate=useNavigate();
 

  const successNotify = (string) => toast.success(string);
  const errorNotify = (string) => toast.error(string);
  const warnNotify = (string) => toast.warn(string);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleRegisterVisitorSubmit(e) {
    e.preventDefault();

    if (user.password !== user.rePassword) {
      errorNotify("Şifreler uyuşmuyor. Lütfen kontrol ediniz.");
      return;
    }

    console.log(user);
    AuthService.register(user)
      .then((data) => {
        setUser({ username: "", password: "" , rePassword:""});
        successNotify(data.data.successMessage);
        setTimeout(() => {
          navigate("/")
        }, 500);
        
      })
      .catch((err) => {
        if (err.response.data.fields) {
          errorNotify(err.response.data.fields[0]);
        } else {
          errorNotify(err.response.data.message);
        }
      });
  }

  return (
    <>
      <div>
        <form
          onSubmit={handleRegisterVisitorSubmit}
          className="d-flex flex-column text-center border border-light rounded pt-5 pb-5 bg-light bg-opacity-25 px-5"
        >
          <h3 className="text-light mb-4">Kayıt Ol</h3>
          <label className="text-start form-label"> Kullanıcı adı</label>
          <input
            className="rounded w-100 mb-3 form-control"
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
            value={user.username}
          />
          <label className="text-start form-label">Şifre</label>
          <input
            className="rounded w-100 mb-3 form-control"
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={user.password}
          />
           <label className="text-start form-label">Şifre Tekrar</label>
          <input
            className="rounded w-100 mb-3 form-control"
            type="password"
            name="rePassword"
            id="rePassword"
            onChange={handleChange}
            value={user.rePassword}
          />
          <StockyButton text="Kayıt Ol" />
          <small className="text-light mt-2">
            Zaten hesabınız var mı?{" "}
            <NavLink className="logo" to="/">
              GİRİŞ YAP!
            </NavLink>
          </small>
        </form>
      </div>
    </>
  );
}
