import { useState } from "react";
import UnitService from "../../services/UnitService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function UnitEditPage({ selectedUnit, setStatus, units,setUnits }) {
    console.log(selectedUnit);
    const [editUnit, setEditUnit] = useState({
      ...selectedUnit,
    });
  
    function handleInputChange(e) {
      setEditUnit({ ...editUnit, [e.target.name]: e.target.value });
    }
  
    function handleFormSubmit(e) {
      e.preventDefault();
      console.log(editUnit);
      UnitService.update({ ...editUnit })
        .then((data) => {
          const updatedUnits= units.filter(x=>x.id!==editUnit.id);
          setUnits([...updatedUnits,editUnit])
          console.log(data);
          toast.success(data.data.message);
          setTimeout(() => {
            setStatus("Units");
          }, 1000);
        })
        .catch((err) => {
          if (err.response.data.fields) {
            toast.error(err.response.data.fields[0].split(":")[1]);
          } else {
            toast.error(err.response.data.message);
          }
        });
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
                <h2 className="text-center">Birim Bilgisini Guncelle</h2>
                <div>
                  <label className="form-label mt-2">Birim</label>
                  <input
                  className="form-control"
                    type="text"
                    name="name"
                    value={editUnit.name}
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
                  Vazgec
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }