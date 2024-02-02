import { BsPencil } from "react-icons/bs";
import { IoMdTrash } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryService from "../../services/CategoryService";
import Swal from "sweetalert2";
import { useState } from "react";
export function CategoryList({
    allCategories,
    setAllCategories,
    setStatus,
    setSelectedCategory,
    selectedCategory,
    mainCategories,
    setMainCategories
  }) {
    function handleDeleteClick(categoryId) {

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });

      Swal.fire({
        title: "Emin misiniz?",
        text: "Bu kategoriyi Silmeniz durumunda kategoriye ait ürünler \"Diger\" kategori adı altında gösterilecektir. Eğer bu kategori altında herhangi bir kategori mevcutsa alt kategoriyi \"düzenle\" sayfasından başka kategori altına alabilirsiniz veya ana kategori olarak güncelleyebilirsiniz.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Evet, Sil!",
        cancelButtonText: "Vazgeç",
      }).then((result) => {
        if (result.isConfirmed) {
          // User confirmed, proceed with deletion
          CategoryService.delete(categoryId)
            .then((resp) => {
              toast.success(resp.data.message);
              const updatedCategories = allCategories.filter(
                (category) => category.id !== categoryId
              );
              const updatedMainCategories = mainCategories.filter(
                (x) => x.id !== categoryId
              );
              updatedCategories.length !== mainCategories.length &&
                setMainCategories(updatedMainCategories);
              setAllCategories(updatedCategories);
            })
            .catch((err) => {
              toast.error(err.response.data.message);
            });
        }else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "İptal Edildi",
            text: "Kategorin bizimle güvende :)",
            icon: "error"
          });
      }
      });
    }
  
    function handleAddClick() {
      setStatus("Add");
    }
  
    function handleClick(categoryId) {
      setSelectedCategory(allCategories.find((x) => x.id == categoryId));
      console.log(selectedCategory);
      setStatus("Edit");
    }

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = allCategories.slice(firstIndex, lastIndex);
    const nPages = Math.ceil(allCategories.length / recordsPerPage);
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
            <h3 className="text-center">Tum kategoriler</h3>
            <button onClick={handleAddClick} className="btn btn-success mb-2 d-flex align-items-center justify-content-center">
              <AiOutlinePlus />  <span className="ms-1">Kategori Ekle</span>
            </button>
            <div className="bg-white p-2 rounded border overflow-auto" style={{ minHeight: "700px" }}>
              <table className="table text-center">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>İsim</th>
                    <th>Düzenle</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((category) => (
                    <tr key={category.id}>
                      <td>{category.id}</td>
                      <td>{category.name}</td>
                      <td>
                        <button
                          onClick={() => handleClick(category.id)}
                          className="btn btn-primary me-2"
                        >
                          <BsPencil />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(category.id)}
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