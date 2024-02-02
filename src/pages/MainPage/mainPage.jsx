import { useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryService from "../../services/CategoryService";
import StorageService from "../../services/StorageService";
import UnitService from "../../services/UnitService";

import { UpdateProfilePage } from "../ProfileUpdate/update";
import { UnitPage } from "../Unit/Unit";
import { StoragePage } from "../storage/Storage";
import { CategoryPage } from "../Category/Category";
import { ProductPage } from "../Product/Product";
import SideBar from "../../components/SideBar";
import { CategoryBar } from "./CategoryBar";
import { DataTableComponent } from "./MainDataTable";

export function MainPage({deger,setDeger}) {
  const [allCategories, setAllCategories] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [units, setUnits] = useState([]);
  const [storages, setStorages] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId]= useState(null);

  const warnNotify = (string) => toast.warn(string);

  //Tum Urunler
  useEffect(() => {
    ProductService.getAll()
      .then((datas) => {
        setProducts(datas.data);
        console.log(datas.data);
      })
      .catch((err) => {
        warnNotify(
          "sayfa yuklenirken bir hata oldu Lutfen sayfayi yenileyiniz"
        );
        console.log(err);
      });
  }, []);

  // Tum Kategoriler
  useEffect(() => {
    CategoryService.getAll()
      .then((datas) => {
        setAllCategories(datas.data);
        let mainDatas = datas.data.filter(
          (category) => category.isMainCategory === true
        );
        setMainCategories(mainDatas);
      })
      .catch((err) => {
        warnNotify(
          "Kategori bilgileri yüklenirken bir hata oldu. Lütfen sayfayı yenileyiniz."
        );
        console.log(err);
      });
  }, []);

  // Tum Depolar
  useEffect(() => {
    StorageService.getAll()
      .then((datas) => {
        setStorages(datas.data);
        console.log(datas.data);
      })
      .catch((err) => {
        warnNotify(
          "depo bilgileri yuklenirken bir hata oldu Lutfen sayfayi yenileyiniz"
        );
        console.log(err);
      });
  }, []);

  // Tum birimler
  useEffect(() => {
    UnitService.getAll()
      .then((datas) => {
        setUnits(datas.data);
        console.log(datas.data);
      })
      .catch((err) => {
        warnNotify(
          "birim bilgileri yuklenirken bir hata oldu Lutfen sayfayi yenileyiniz"
        );
        console.log(err);
      });
  }, []);


  return (
    <div className="d-flex">
      <SideBar setDeger={setDeger}/>
      <main className="d-flex flex-column justify-content-center mw-100 vh-100">
        <div className="mx-5 rounded bg-light p-4 overflow-hidden overflow-y-auto">
          {deger == "main" && (
            <CategoryBar
              mainCategories={mainCategories}
              setProducts={setProducts}
              allCategories={allCategories}
              setSelectedCategoryId={setSelectedCategoryId}
            />
          )}
          {deger == "main" && (
            <DataTableComponent
              allCategories={allCategories}
              products={products}
              units={units}
              storages={storages}
              selectedCategoryId={selectedCategoryId}
            />
          )}
          {deger == "updateProf" && <UpdateProfilePage />}
          {deger == "unitPage" && (
            <UnitPage units={units} setUnits={setUnits} />
          )}
          {deger == "storagePage" && (
            <StoragePage storages={storages} setStorages={setStorages} />
          )}
          {deger == "categoryPage" && (
            <CategoryPage
              allCategories={allCategories}
              setAllCategories={setAllCategories}
              mainCategories={mainCategories}
              setMainCategories={setMainCategories}
            />
          )}
          {deger == "productPage" && (
            <ProductPage
              products={products}
              setProducts={setProducts}
              allCategories={allCategories}
              storages={storages}
              units={units}
            />
          )}
        </div>
      </main>
    </div>
  );
}


