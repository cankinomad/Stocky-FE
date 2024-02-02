import { BsPencil } from "react-icons/bs";
import { IoMdTrash } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import UnitService from "../../services/UnitService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useState } from "react";

export function UnitList({ units, handleClick, setUnits, setStatus }) {
  function handleDeleteClick(unitId) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    Swal.fire({
      title: "Emin misiniz?",
      text: 'Bu birimi silmeniz durumunda birimi kullanan ürünler "Diger" birim adı altında gösterilecektir',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet, Sil!",
      cancelButtonText: "Vazgeç",
    }).then((result) => {
      if (result.isConfirmed) {
        UnitService.delete(unitId)
          .then((resp) => {
            toast.success(resp.data.message);
            const updatedUnits = units.filter((unit) => unit.id != unitId);
            setUnits(updatedUnits);
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "İptal edildi!",
          text: "birimin kurtarıldı :)",
          icon: "error",
        });
      }
    });
  }

  function handleAddClick() {
    setStatus("Add");
  }

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = units.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(units.length / recordsPerPage);
  const numbers = [...Array(nPages + 1).keys()].slice(1);


  function prePage(){
    if(currentPage !== 1){
      setCurrentPage(currentPage-1)
    }
}

function changeCPage(id){
  setCurrentPage(id)
}

function nextPage(){
  if(currentPage !== nPages){
    setCurrentPage(currentPage+1)
  }
}


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h3 className="text-center">Tüm Birimler</h3>
          <button onClick={handleAddClick} className="btn btn-success mb-2 d-flex align-items-center justify-content-center">
            <AiOutlinePlus /> {"  "} <span className="ms-1">Birim Ekle</span>
          </button>
          <div className="bg-white rounded p-2 border overflow-auto" style={{ minHeight: "500px" }}>
          <table className="table text-center">
        <thead>
          <tr >
          <th>ID</th>
          <th>İsim</th>
          <th>Düzenle</th>
          </tr>
        </thead>
        <tbody>
          {records.map((unit) => (
            <tr key={unit.id}>
              <td>{unit.id}</td>
              <td>{unit.name}</td>
              <td>
                <button
                  onClick={() => handleClick(unit.id)}
                  className="btn btn-primary me-2"
                >
                  <BsPencil />
                </button>
                <button
                  onClick={() => handleDeleteClick(unit.id)}
                  className="btn btn-danger"
                >
                  <IoMdTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav className="d-flex flex-column align-items-end">
        <ul className="pagination">
          <li className="page-item">
            <a href="#" className="page-link" onClick={prePage}>
              Prev
            </a>
          </li>
          {numbers.map((n, i) => (
          <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
            <a href="#" className='page-link' onClick={()=>changeCPage(n)} >{n}</a>
          </li>
        ))}
        <li className="page-item">
        <a href="#" className="page-link" onClick={nextPage}>Next</a>

        </li>
        </ul>
      </nav>
          </div>
        </div>
      </div>
    </div>
  );



 

 


}
