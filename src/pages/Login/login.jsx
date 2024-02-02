import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StockyButton } from "../../components/StockyButton";

export function Login() {
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
        <LoginFrm />
      </main>
      <footer></footer>
    </div>
  );
}

function LoginFrm() {
  const navigate = useNavigate();

  const [loginParam, setLoginParam] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  const successNotify = (string) => toast.success(string);
  const errorNotify = (string) => toast.error(string);
  const warnNotify = (string) => toast.warn(string);

  function handleChange(e) {
    setLoginParam({ ...loginParam, [e.target.name]: e.target.value });
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    AuthService.login(loginParam)
      .then((data) => {
        console.log(data);
        setLoginParam({ username: "", password: "" });
        console.log(data.data.token)
        sessionStorage.setItem("token", data.data.token);
        successNotify("Hosgeldiniz :)");
        navigate("/main-page");
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
          onSubmit={handleLoginSubmit}
          className="d-flex flex-column text-center border border-light rounded pt-5 pb-5 bg-light bg-opacity-25 px-5"
        >
          <h3 className="text-light mb-4">Giriş Yap</h3>

          <label className="text-start form-label"> Kullanıcı adı</label>
          <input
            className="rounded w-100 mb-2 form-control"
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
            value={loginParam.username}
          />
          <label className="text-start form-label">Şifre</label>
          <input
            className="rounded w-100 form-control mb-3"
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={loginParam.password}
          />
          <StockyButton text="Giriş Yap"  />
          <small className="text-light mt-2">
            Hesabınız yok mu?{" "}
            <NavLink className="logo" to="/register">
              KAYIT OL!
            </NavLink>
          </small>
        </form>
        {error !== null && <p>{error}</p>}
      </div>
    </>
  );
}
