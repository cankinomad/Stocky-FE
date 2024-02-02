import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductService from "../../services/ProductService";
import { useState } from "react";
import { Form } from "react-bootstrap";

export function AddProductPage({setStatus,storages,units,allCategories,products,setProducts}){

    const[addproduct,setAddProduct]=useState({
      categoryId: 1,
      storageId: 1,
      unitId: 1,
      name: "",
      amount: "",
    })
  
    const [nonMainCategories, setNonMainCategories] = useState(
      allCategories.filter((x) => x.isMainCategory == false || x.id === 1)
    );
  
    function handleFormSubmit(e) {
      e.preventDefault();
  
      console.log(addproduct);
      ProductService.create(addproduct)
        .then((data) => {
          console.log(data);
          toast.success(data.data.name+" isimli urun listeye eklenmistir");
          setProducts([...products,data.data])
          setTimeout(() => {
            setStatus("Products");
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
  
    console.log(addproduct);
  
    function handleInputChange(e) {
      console.log(e.target.name);
      console.log(e.target.value);
      setAddProduct({ ...addproduct, [e.target.name]: e.target.value });
    }
  
    function handleDenyClick() {
      setStatus("Products");
    }
    return(
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form onSubmit={handleFormSubmit}>
              <div >
                <h2 className="text-center">Yeni Ürün Ekle</h2>
                <div>
                  <label className="form-label" >Ürün Adı</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    value={addproduct.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="form-label mt-2">Mevcut Kategori </label>
                  <Form.Select
                    name="categoryId"
                    value={addproduct.categoryId}
                    onChange={handleInputChange}
                  >
                    {nonMainCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
                <div>
                  <label className="form-label mt-2">Mevcut Birim</label>
                  <Form.Select
                    name="unitId"
                    value={addproduct.unitId}
                    onChange={handleInputChange}
                  >
                    {units.map((unit) => (
                      <option key={unit.id} value={unit.id}>
                        {unit.name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
                <div>
                  <label className="form-label mt-2">Mevcut Depo</label>
                  <Form.Select
                    name="storageId"
                    value={addproduct.storageId}
                    onChange={handleInputChange}
                  >
                    {storages.map((storage) => (
                      <option key={storage.id} value={storage.id}>
                        {storage.name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
                <div>
                  <label className="form-label mt-2">Adet</label>
                  <input
                  className="form-control"
                    type="text"
                    name="amount"
                    value={addproduct.amount}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-success mt-3">
                  Kaydet
                </button>
                <button
                  type="button"
                  onClick={handleDenyClick}
                  className="btn btn-danger mt-3"
                >
                  Vazgec
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }