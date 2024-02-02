import { useState } from "react";
import CategoryService from "../../services/CategoryService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AddCategoryPage({ setStatus, allCategories, setAllCategories, mainCategories, setMainCategories }) {
    const [nonMainCategories, setNonMainCategories] = useState(
      allCategories.filter((category) => category.isMainCategory !== true)
    );
  
    const [addedSubCategories, setAddedSubCategories] = useState([]);
  
    const [newCategory, setNewCategory] = useState({
      name: "",
      isMainCategory: false,
      categories: [],
    });
  
    function handleFormSubmit(e) {
      e.preventDefault();
      CategoryService.create(newCategory)
        .then((data) => {
          console.log(data.data,"**********************")
          setAllCategories([...allCategories,data.data])
          toast.success(data.data.name+" kategorisi başarıyla eklenmiştir");
          newCategory.isMainCategory && setMainCategories([...mainCategories,data.data])
          setTimeout(() => {
            setStatus("Categories");
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
  
    function handleInputChange(e) {
      setNewCategory({
        ...newCategory,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      });
      console.log(newCategory);
    }
  
    function handleDenyClick() {
      setStatus("Categories");
    }
  
    function handleCategoryAddClick(category) {
      console.log(category);
      setNewCategory({
        ...newCategory,
        categories: [...newCategory.categories, category.id],
      });
      console.log(newCategory);
      setNonMainCategories(nonMainCategories.filter((c) => c.id !== category.id));
      setAddedSubCategories([...addedSubCategories, category]);
    }
    function handleCategoryMinusClick(category) {
      const updatedAddedSubCategories = addedSubCategories.filter(
        (c) => c.id !== category.id
      );
  
      setAddedSubCategories(updatedAddedSubCategories);
  
      setNonMainCategories([...nonMainCategories, category]);
  
      const updatedCategories = newCategory.categories.filter(
        (categoryId) => categoryId !== category.id
      );
  
    
      setNewCategory({
        ...newCategory,
        categories: updatedCategories,
      });
    }
  
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form onSubmit={handleFormSubmit}>
              <div>
                <h2>Yeni Kategori Ekle</h2>
                <div className="mb-3">
                  <label className="form-label">İsim</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={newCategory.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    id="isMainCategoryCheckbox"
                    className="form-check-input"
                    name="isMainCategory"
                    value={newCategory.isMainCategory}
                    onChange={handleInputChange}
                  />
                  {newCategory.isMainCategory == false ?  <label htmlFor="isMainCategoryCheckbox" className="form-check-label text-danger" >
                    Ana Kategori Olsun Mu?
                  </label>: <label label htmlFor="isMainCategoryCheckbox" className="form-check-label text-success" >
                    Ana Kategori Olarak İşaretlendi
                  </label>}
                </div>
              </div>
              <div className="category-list-container">
                <h3>Isterseniz Alt kategoriler Ekleyebilirsiniz</h3>
                <div
                  className="list-group"
                  style={{ maxHeight: "200px", overflowY: "auto" }}
                >
                  {nonMainCategories.map((category, index) => (
                    <div
                      onClick={() => handleCategoryAddClick(category)}
                      className="list-group-item list-group-item-action"
                      key={index}
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
              </div>
              {addedSubCategories && addedSubCategories.length > 0 ? (
                <div className="category-list-container">
                  <h3>Eklenen Alt kategoriler</h3>
                  <div
                    className="list-group"
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                  >
                    {addedSubCategories.map((category, index) => (
                      <div
                        onClick={() => handleCategoryMinusClick(category)}
                        className="list-group-item list-group-item-action"
                        key={index}
                      >
                        {category.name}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              <div className="d-flex justify-content-between mt-3">
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