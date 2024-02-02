import { BsPencil } from "react-icons/bs";
import { IoMdTrash } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import StorageService from "../../services/StorageService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { StorageEditPage } from "./StorageEdit";
import { AddStoragePage } from "./StorageAdd";
import { StorageList } from "./StorageList";

export function StoragePage({ storages, setStorages }) {
  const [status, setStatus] = useState("Storage");
  const [selectedStorage, setSelectedStorage] = useState({
    id: "",
    name: "",
  });

  function handleClick(storageId) {
    StorageService.getName(storageId)
      .then((name) => {
        setSelectedStorage({ id: storageId, name: name.data.message });
        setStatus("Edit");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {status === "Storage" && (
        <StorageList
          storages={storages}
          setStorages={setStorages}
          handleClick={handleClick}
          setStatus={setStatus}
        />
      )}

      {status === "Edit" && selectedStorage !== null && (
        <StorageEditPage selectedStorage={selectedStorage} setStatus={setStatus} storages={storages} setStorages={setStorages} />
      )}
      {status === "Add" && <AddStoragePage storages={storages} setStorages={setStorages} setStatus={setStatus} />}
    </>
  );
}


