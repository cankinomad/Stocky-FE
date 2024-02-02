import StorageService from "../../services/StorageService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export function AddStoragePage({ setStatus,storages,setStorages }) {
    const [newStorage, setNewStorage] = useState({
      name: "",
    });
  
    function handleFormSubmit(e) {
      e.preventDefault();
      StorageService.create(newStorage)
        .then((data) => {
          setStorages([...storages,data.data])
          toast.success(data.data.name+" deposu başarıyla eklenmiştir");
          setTimeout(() => {
            setStatus("Storage");
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.fields) {
            toast.error(err.response.data.fields[0].split(":")[1]);
          } else {
            toast.error(err.response.data.message);
          }
        });
    }
  
    function handleInputChange(e) {
      setNewStorage({ ...newStorage, [e.target.name]: e.target.value });
    }
  
    function handleDenyClick() {
      setStatus("Storage");
    }
  
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form onSubmit={handleFormSubmit}>
              <div>
                <h2 className="text-center">Yeni Depo Ekle</h2>
                <div>
                  <label className="form-label mt-2">Depo İsmi</label>
                  <input
                  className="form-control"
                    type="text"
                    name="name"
                    value={newStorage.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <button type="submit" className="btn btn-success">
                  Ekle
                </button>
                <button
                  type="button"
                  onClick={handleDenyClick}
                  className="btn btn-danger"
                >
                  Vazgec
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }