import { useState } from "react";
import CategoryService from "../../services/CategoryService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export function CategoryEditPage({ selectedCategory, setStatus, allCategories,setAllCategories, setMainCategories, mainCategories }) {
    console.log(selectedCategory);
    const [editCetegory, setEditCategory] = useState({
      ...selectedCategory,
    });
  console.log(selectedCategory)
    const [nonMainCategories, setNonMainCategories] = useState(
      allCategories.filter((category) => category.isMainCategory !== true && category.id !== selectedCategory.id)
    );
    console.log(nonMainCategories);
    console.log(selectedCategory);
  
    const [subCategories, setSubCategories] = useState(
      selectedCategory.categories
    );
    const [updatedNonMainCategories, setUpdatedNonMainCategories] = useState(
      nonMainCategories.filter((category) => !subCategories.includes(category.id))
    );
  
    console.log(updatedNonMainCategories);
    console.log(subCategories);
  
    function handleInputChange(e) {
      setEditCategory({
        ...editCetegory,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      });
    }
  
    function handleFormSubmit(e) {
      e.preventDefault();
      console.log(editCetegory);
      CategoryService.update(editCetegory)
        .then((data) => {
          const updatedCategory= allCategories.filter(x=>x.id!==editCetegory.id);
          setAllCategories([...updatedCategory,editCetegory])
          setMainCategories(mainCategories.map(x=>{
            if(x.id == editCetegory.id)
            return editCetegory
            return x
          }))

          console.log(data);
          toast.success(data.data.message);
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
  
    function handleDenyClick() {
      setStatus("Categories");
    }
  
    function handleSwitchClick(categoryId) {
      const category = nonMainCategories.find((x) => x.id == categoryId);
      console.log(category);
      const currentCategoryListContains = subCategories.find(
        (id) => id == categoryId
      );
      const categoryListContains = updatedNonMainCategories.find(
        (category) => category.id == categoryId
      );
  
      if (currentCategoryListContains) {
        setSubCategories(subCategories.filter((id) => id !== categoryId));
        setEditCategory({
          ...editCetegory,
          categories: subCategories.filter((id) => id !== categoryId),
        });
      } else {
        setSubCategories([...subCategories, categoryId]);
        setEditCategory({
          ...editCetegory,
          categories: [...subCategories, categoryId],
        });
      }
  
      if (categoryListContains) {
        setUpdatedNonMainCategories(
          updatedNonMainCategories.filter((cat) => cat.id !== categoryId)
        );
      } else {
        setUpdatedNonMainCategories([...updatedNonMainCategories, category]);
      }
    }
  
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form onSubmit={handleFormSubmit}>
              <div>
                <h2 className="text-center">Kategori Bilgisini Güncelle</h2>
                <div>
                  <label className="form-label mt-2">Kategori ismi</label>
                  <input
                  className="form-control"
                    type="text"
                    name="name"
                    value={editCetegory.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3 form-check mt-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="isMainCategory"
                    id="isMainCategoryCheckbox"
                    value={editCetegory.isMainCategory}
                    checked={editCetegory.isMainCategory}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="isMainCategoryCheckbox" className={`form-check-label ${editCetegory.isMainCategory
                      ? "text-success": "text-danger"} `} >
                    {editCetegory.isMainCategory
                      ? "Ana Kategori "
                      : " Ana Kategori Degil"}
                  </label>
                </div>
              </div>
              <div className="category-list-container">
                <h3 className="form-label mt-2">
                  Ekleyebileceginiz Alt kategoriler</h3>
                <div
                  className="list-group"
                  style={{ maxHeight: "200px", overflowY: "auto" }}
                >
                  {updatedNonMainCategories.map((category, index) => (
                    <div
                      onClick={() => handleSwitchClick(category.id)}
                      className="list-group-item list-group-item-action"
                      key={index}
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
              </div>
              {subCategories && subCategories.length > 0 ? (
                <div className="category-list-container">
                  <h3 className="form-label mt-2 ">Mevcut Alt kategoriler</h3>
                  <div
                    className="list-group"
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                  >
                    {subCategories.map((id) => (
                      <div
                        className="list-group-item list-group-item-action text-success"
                        data={"current"}
                        onClick={() => handleSwitchClick(id)}
                        key={id}
                      >
                        {allCategories.find((x) => x.id == id).name}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-success mt-4">
                  Kaydet
                </button>
                <button
                  type="button"
                  onClick={handleDenyClick}
                  className="btn btn-danger mt-4"
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