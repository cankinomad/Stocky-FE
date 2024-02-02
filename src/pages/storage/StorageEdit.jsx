import StorageService from "../../services/StorageService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export function StorageEditPage({ selectedStorage, setStatus,storages,setStorages }) {
    console.log(selectedStorage);
    const [editStorage, setEditStorage] = useState({ ...selectedStorage });
  
    function handleInputChange(e) {
      setEditStorage({ ...editStorage, [e.target.name]: e.target.value });
    }
  
    function handleFormSubmit(e) {
      e.preventDefault();
      console.log(editStorage);
      StorageService.update(editStorage)
        .then((data) => {
          console.log(data);
          console.log(storages)
          const updatedStorages =storages.filter(x=>x.id!==editStorage.id);
          setStorages([...updatedStorages, editStorage])
          toast.success(data.data.message);
          setTimeout(() => {
            setStatus("Storage");
          }, 1000);
        })
        .catch((err) => {
          console.log(err)
          if (err.response.data.fields) {
            toast.error(err.response.data.fields[0].split(":")[1]);
          } else {
            toast.error(err.response.data.message);
          }
        });
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
                <h2 className="text-center">Depo Bilgisini Güncelle</h2>
                <div>
                  <label className="form-label mt-2">Depo</label>
                  <input
                  className="form-control"
                    type="text"
                    name="name"
                    value={editStorage.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <button type="submit" className="btn btn-success">
                  Kaydet
                </button>
                <button
                  type="button"
                  onClick={handleDenyClick}
                  className="btn btn-danger"
                >
                  Vazgeç
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }