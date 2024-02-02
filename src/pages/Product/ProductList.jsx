import { BsPencil } from "react-icons/bs";
import { IoMdTrash } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductService from "../../services/ProductService";
import Swal from "sweetalert2";
import { useState } from "react";


export function ProductList({ products, setProducts, setStatus, setSelectedProduct }) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });

    function handleDeleteClick(productId) {
      Swal.fire({
        title: "Emin misiniz?",
        text: "Bu işlemi geri alamayacaksınız!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Evet, Sil!",
        cancelButtonText: "Vazgeç",
      }).then((result)=>{
        if(result.isConfirmed){
           console.log(productId);
           ProductService.delete(productId)
          .then((resp) => {
          toast.success(resp.data.message);
          const updatedProducts = products.filter(
            (product) => product.id != productId
          );
          setProducts(updatedProducts);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
        }else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "İptal Edildi",
            text: "Ürününüz emin ellerde :)",
            icon: "error"
          });
      }})
     
    }
  
    function handleClick(productId) {
      setSelectedProduct(products.find((product) => product.id == productId));
      setStatus("Edit");
    }
  
    function handleAddClick() {
      setStatus("Add");
    }


    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = products.slice(firstIndex, lastIndex);
    const nPages = Math.ceil(products.length / recordsPerPage);
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
            <h3 className="text-center">Tüm Ürünler</h3>
            <button
              onClick={handleAddClick}
              className="btn btn-success d-flex align-items-center justify-content-center mb-2"
            >
              <AiOutlinePlus /> <span className="ms-1"> Ürün Ekle</span>
            </button>
            <div className="bg-white rounded p-2 border overflow-auto" style={{minHeight:"700px"}} >
              <table className="table text-center">
                <thead >
                  <tr>
                    <th>Id</th>
                    <th>İsim</th>
                    <th>Düzenle</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>
                        <button
                          onClick={() => handleClick(product.id)}
                          className="btn btn-primary me-2"
                        >
                          <BsPencil />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(product.id)}
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