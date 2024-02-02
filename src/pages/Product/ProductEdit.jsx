import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductService from "../../services/ProductService";
import { useState } from "react";
import { Form } from "react-bootstrap";

export function ProductEditPage({
    selectedProduct,
    setStatus,
    allCategories,
    units,
    storages,
    products,
    setProducts
  }) {
    const [editProduct, setEditProduct] = useState({ ...selectedProduct });
  
    const [nonMainCategories, setNonMainCategories] = useState(
      allCategories.filter((x) => x.isMainCategory == false || x.id === 1)
    );
  
    function handleFormSubmit(e) {
      e.preventDefault();
  
      console.log(editProduct);
      ProductService.update(editProduct)
        .then((data) => {
          console.log(data);
          const updatedProducts= products.filter(x=>x.id!==editProduct.id);
          setProducts([...updatedProducts, editProduct])
          toast.success(data.data.message);
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
  
    console.log(editProduct);
  
    function handleInputChange(e) {
      console.log(e.target.name);
      console.log(e.target.value);
      setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
    }
  
    function handleDenyClick() {
      setStatus("Products");
    }
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form onSubmit={handleFormSubmit}>
              <div>
                <h2 className="text-center">Ürün Bilgisini Güncelle</h2>
                <div>
                  <label className="form-label mt-2">
                  Ürün Adı</label>
                  <input
                  className="form-control"
                    type="text"
                    name="name"
                    value={editProduct.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="form-label mt-2">Mevcut Kategori </label>
                  <Form.Select
                    name="categoryId"
                    value={editProduct.categoryId}
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
                    value={editProduct.unitId}
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
                    value={editProduct.storageId}
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
                    value={editProduct.amount}
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
    );
  }