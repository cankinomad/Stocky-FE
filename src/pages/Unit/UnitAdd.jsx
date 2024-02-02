import { useState } from "react";
import UnitService from "../../services/UnitService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AddUnitPage({ setStatus, units, setUnits }) {
    const [newUnit, setNewUnit] = useState({
      name: "",
    });
  
    function handleFormSubmit(e) {
      e.preventDefault();
      UnitService.create(newUnit)
        .then((data) => {
          console.log(data)
          setUnits([...units, data.data])
          toast.success(data.data.name +" isimli birim başarıyla eklendi");
          setTimeout(() => {
            setStatus("Units");
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
  
    function handleInputChange(e) {
      setNewUnit({...newUnit,[e.target.name]:e.target.value});
    }
  
    function handleDenyClick() {
      setStatus("Units");
    }
  
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form onSubmit={handleFormSubmit}>
              <div>
                <h2 className="text-center">Yeni Birim Ekle</h2>
                <div>
                  <label className="form-label mt-2">Birim</label>
                  <input
                  className="form-control"
                    type="text"
                    name="name"
                    value={newUnit.name}
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
                  Vazgeç
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }