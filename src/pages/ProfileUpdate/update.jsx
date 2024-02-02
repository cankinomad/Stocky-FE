import { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function UpdateProfilePage() {
  const [passwordRequest, setPasswordRequest] = useState(false);

  const [userUpdate, setUserUpdate] = useState({
    token: sessionStorage.getItem("token"),
    name: "",
    surname: "",
    title: "",
  });

  const [passwordUpdate, setPasswordUpdate] = useState({
    token: sessionStorage.getItem("token"),
    oldPassword:"",
    password: "",
  });
 
  useEffect(() => {
    UserService.information(userUpdate.token).then((resp)=>{
      console.log(resp) //===> {name: 'Salih', surname: '', title: ''} donuyor ve bunu userUpdate icine vermek
      setUserUpdate({...userUpdate,name:resp.data.name, surname:resp.data.surname, title: resp.data.title})
    }).catch((err)=>console.log(err))
  },[])

  console.log(userUpdate)

  const successNotify = (string) => toast.success(string);
  const errorNotify = (string) => toast.error(string);
  const warnNotify = (string) => toast.warn(string);

  function handleChange(e) {
    setUserUpdate({ ...userUpdate, [e.target.name]: e.target.value });
  }

  function handleChangePw(e) {
    setPasswordUpdate({ ...passwordUpdate, [e.target.name]: e.target.value });
  }

  function handleUpdateProfileSubmit(e) {
    e.preventDefault();
    UserService.update(userUpdate)
      .then((data) => {
        console.log(data);
        setUserUpdate({
          token: sessionStorage.getItem("token"),
          name: "",
          surname: "",
          title: "",
        });
        successNotify(data.data.successMessage)
     
      })
      .catch((err) => {
        if (err.response.data.fields) {
          errorNotify(err.response.data.fields[0]);
        } else {
          errorNotify(err.response.data.message);
        }
      });
  }

  function handleUpdatePasswordSubmit(e) {
    e.preventDefault();
    UserService.changePassword(passwordUpdate)
      .then((data) => {
        console.log(data);

        const messageString= data.data.successMessage.split(":");
        console.log(messageString)
        switch (messageString[1]) {
          case "s":
          successNotify(messageString[0]);
          setPasswordUpdate({
            token: sessionStorage.getItem("token"),
            oldPassword:"",
            password: "",
          });
          break;
          case "w":
          warnNotify(messageString[0]);
          break;
          case "e":
          errorNotify(messageString[0]);
           break;
          default:
            warnNotify("Lutfen tekrar deneyiniz");
            break;
        }
        
      })
      .catch((err) => {
        if (err.response.data.fields) {
          errorNotify(err.response.data.fields[0]);
        } else {
          errorNotify(err.response.data.message);
        }
      });
  }

  function handleClick() {
    setPasswordRequest(true);
  }

  return (
    <>
      <div className="login-container py-2">
        {!passwordRequest && (
          <form onSubmit={handleUpdateProfileSubmit} >
            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className="rounded border text-light py-2 px-4"
                onClick={handleClick}
              >
                Şifremi Değiştir
              </button>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h2>Profil güncelle</h2>
              <div className=" w-50">
              <label className="form-label ">Ad</label>
              <input
                className="w-100 rounded mb-2 form-control"
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
                value={userUpdate.name}
              /></div>
              <div className=" w-50">
              <label className="form-label">Soyad</label>
              <input
                className="w-100 rounded mb-2 form-control"
                type="text"
                name="surname"
                id="surname"
                onChange={handleChange}
                value={userUpdate.surname}
              /></div>

            <div className="w-50">
                <label className="form-label">Pozisyon</label>
              <input
                className="w-100 rounded mb-2 form-control"
                type="text"
                name="title"
                id="title"
                onChange={handleChange}
                value={userUpdate.title}
              /></div>

              <button
                type="submit"
                className="rounded border text-light py-2 w-50"
              >
                Bilgilerimi Güncelle
              </button>
            </div>
          </form>
        )}

        {passwordRequest && (
          <form onSubmit={handleUpdatePasswordSubmit} className="px-5">
            <h2 className="text-center mb-2">Şifre Güncelle</h2>
            <div className="d-flex flex-column justify-content-center align-items-center ">
              <label className="form-label">Mevcut Şifreniz</label>
              <input
                type="password"
                name="oldPassword"
                id="oldPassword"
                onChange={handleChangePw}
                value={passwordUpdate.oldPassword}
                className="rounded w-100  form-control mb-2"
              />

                <label className="form-label">Yeni Şifreniz</label>
                <input
                type="password"
                name="password"
                id="password"
                onChange={handleChangePw}
                value={passwordUpdate.password}
                className="rounded w-100 form-control"
              />
              <button
                type="submit"
                className="rounded border text-light py-1 w-100 mt-2"
              >
                Şifremi Güncelle
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
