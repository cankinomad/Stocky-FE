import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { AddProductPage } from "./ProductAdd";
import { ProductEditPage } from "./ProductEdit";
import { ProductList } from "./ProductList";

export function ProductPage({
  products,
  setProducts,
  allCategories,
  storages,
  units,
}) {
  const [status, setStatus] = useState("Products");
  const [selectedProduct, setSelectedProduct] = useState({
    id: "",
    categoryId: "",
    storageId: "",
    unitId: "",
    name: "",
    amount: "",
  });

  return (
    <>
      {status === "Products" && (
        <ProductList
          products={products}
          setProducts={setProducts}
          setStatus={setStatus}
          setSelectedProduct={setSelectedProduct}
        />
      )}
      {status === "Edit" && selectedProduct !== null && (
        <ProductEditPage
          selectedProduct={selectedProduct}
          setStatus={setStatus}
          allCategories={allCategories}
          units={units}
          storages={storages}
          setProducts={setProducts}
          products={products}
        />
      )}
       {status === "Add" && selectedProduct !== null && <AddProductPage products={products} setProducts={setProducts} setStatus={setStatus}  storages={storages} units={units}  allCategories={allCategories}/>} 
    </>
  );
}


