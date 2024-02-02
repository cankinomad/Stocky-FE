import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import CategoryService from "../../services/CategoryService";
import { CategoryList } from "./CategoryList";
import { AddCategoryPage } from "./CategoryAdd";
import { CategoryEditPage } from "./CategoryEdit";

export function CategoryPage({ allCategories, setAllCategories, mainCategories, setMainCategories }) {
  const [status, setStatus] = useState("Categories");
  const [selectedCategory, setSelectedCategory] = useState({
    id: "",
    name: "",
    isMainCategory: "",
    categories: [],
  });

  function handleClick(categoryId) {
    CategoryService.getItself(categoryId)
      .then((category) => {
        console.log(category);
        setStatus("Edit");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {status === "Categories" && (
        <CategoryList
          allCategories={allCategories}
          setAllCategories={setAllCategories}
          handleClick={handleClick}
          setStatus={setStatus}
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          mainCategories={mainCategories}
          setMainCategories={setMainCategories}
        />
      )}
      {status === "Edit" && selectedCategory !== null && (
        <CategoryEditPage
          selectedCategory={selectedCategory}
          setStatus={setStatus}
          allCategories={allCategories}
          setAllCategories={setAllCategories}
          mainCategories={mainCategories}
          setMainCategories={setMainCategories}
        />
      )}
      {status === "Add" && selectedCategory !== null && (
        <AddCategoryPage allCategories={allCategories}  setAllCategories={setAllCategories} mainCategories={mainCategories} setMainCategories={setMainCategories}  setStatus={setStatus} />
      )}
    </>
  );
}


