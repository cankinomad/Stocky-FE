import { useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function CategoryBar({
  mainCategories,
  setProducts,
  allCategories,
  setSelectedCategoryId,
}) {
  const [subCategories, setSubCategories] = useState([]);
  const [subUl, setSubUl] = useState("d-none");
  function CategoryButtons() {
    // <div id="button-tooltip" {...props}>
    //   <div className="">
    //     {subCategories &&
    //       subCategories.map((item, index) => (
    //         <div key={index}>{item.name}</div>
    //       ))}
    //   </div>
    // </div>

    return (
      <div className="rounded d-flex justify-content-center flex-wrap">
        <div>
          <button
            onClick={() => handleClick(null)}
            className="btn btn-secondary p-2 rounded text-light mb-2 me-2 bg-success"
          >
            Tümü
          </button>
        </div>
        {mainCategories.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => handleClick(item.id)}
              key={index}
              className={`btn btn-secondary p-2 rounded text-light mb-2 me-2 ${
                item.name == "Diger" && "bg-danger"
              } `}
            >
              {item.name}
            </button>
          </div>
        ))}
      </div>
    );
  }

  function handleClick(categoryId) {
    console.log(categoryId)
    if (categoryId == null) {
      setSelectedCategoryId(null);
      setSubCategories([]);
    } else {
      const selectedCategory = allCategories.find((x) => x.id == categoryId);
      let dizi = [];
      if (selectedCategory.categories.length !== 0) {
        for (
          let index = 0;
          index < selectedCategory.categories.length;
          index++
        ) {
          const element = selectedCategory.categories[index];
          const matchedCategory = allCategories.find(
            (item) => item.id === element
          );
          dizi = [...dizi, matchedCategory];
        }
        if (dizi.length > 0) {
          setSubUl("d-flex");
        } else {
          setSubUl("d-none");
        }
        setSubCategories(dizi);
      }
      setSelectedCategoryId(categoryId);
      console.log(categoryId)
      ProductService.productByCategory(categoryId)
        .then((data) => {
          console.log(data);
          toast.success(
            `veriler  ${
              allCategories.find((cat) => cat.id == categoryId).name
            } kategorisine gore guncellenmistir`
          );
        })
        .catch((err) => {
          {
            dizi.length == 0 &&
              toast.error(
                `${
                  allCategories.find((cat) => cat.id == categoryId).name
                } kategorisine ait urun bulunamadi.`
              );
          }
          {
            dizi.length == 0 && setSubUl("d-none");
          }
          {
            dizi.length == 0 && setSubCategories("");
          }
          console.log(err);
        });
    }
  }

  // useEffect(() => {
  //   console.log(subCategories);
  // }, [subCategories]);
  return (
    <>
      <CategoryButtons />
      {subCategories && subCategories.length > 0 && (
        <ul className={`border rounded p-3 ${subUl}`}>
          <div className="d-flex flex-column">
            <p>Alt Kategoriler</p>
            {subCategories.map((item, index) => (
              <li
                onClick={() => handleClick(item.id)}
                className="text-decoration-underline list-unstyled me-5"
                key={index}
              >
                {item.name}
              </li>
            ))}
          </div>
        </ul>
      )}
    </>
  );
}
