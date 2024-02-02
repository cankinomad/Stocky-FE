import { useState } from "react";
import { BsPencil } from "react-icons/bs";
import { IoMdTrash } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import UnitService from "../../services/UnitService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddUnitPage } from "./UnitAdd";
import { UnitEditPage } from "./UnitEdit";
import { UnitList } from "./UnitList";

export function UnitPage({ units, setUnits }) {
  const [status, setStatus] = useState("Units");
  const [selectedUnit, setSelectedUnit] = useState({
    id: "",
    name: "",
  });
  function handleClick(unitId) {
    UnitService.getName(unitId)
      .then((name) => {
        setSelectedUnit({ id: unitId, name: name.data.message });
        setStatus("Edit");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {status === "Units" && (
        <UnitList
          units={units}
          setUnits={setUnits}
          handleClick={handleClick}
          setStatus={setStatus}
        />
      )}
      {status === "Edit" && selectedUnit !== null && (
        <UnitEditPage selectedUnit={selectedUnit} setStatus={setStatus} setUnits={setUnits} units={units}/>
      )}
      {status === "Add" && selectedUnit !== null && (
        <AddUnitPage setStatus={setStatus} units={units} setUnits={setUnits} />
      )}
    </>
  );
}


