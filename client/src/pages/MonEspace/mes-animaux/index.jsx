import List from "@/pages/MonEspace/mes-animaux/list.jsx";
import { getAllPets } from "@/api/pets/index.jsx";
import { Fragment, useEffect, useState } from "react";
import Alert from "@/components/atoms/Alerts/index.jsx";
import Add from "@/pages/MonEspace/mes-animaux/add.jsx";
import Edit from "@/pages/MonEspace/mes-animaux/edit.jsx";

export default function MyPets() {
  const [pets, setPets] = useState([]);
  const [state, setState] = useState({});
  const [addPet, setAddPet] = useState(false);
  const [editPet, setEditPet] = useState(false);
  const [currentUUID, setCurrentUUID] = useState(null);
  const handleGetAllPets = async () => {
    const result = await getAllPets();
    if (result.status === 200) {
      setPets(result.data["hydra:member"]);
    }
  };

  useEffect(() => {
    handleGetAllPets();
  }, []);

  useEffect(() => {
    if (state.type === "success") {
      handleGetAllPets();
    }
  }, [state]);

  return (
    <Fragment>
      <div className={"flex flex-col justify-between gap-4"}>
        {state && (
          <Alert
            title={state?.title}
            type={state?.type}
            content="bonjour"
            close={() => setState({})}
          />
        )}
        {!addPet && !editPet && (
          <List
            pets={pets}
            setAddPet={setAddPet}
            setEditPet={setEditPet}
            setCurrentUUID={setCurrentUUID}
          />
        )}
        {addPet && !editPet && (
          <Add setAddPet={setAddPet} setState={setState} />
        )}
        {!addPet && editPet && (
          <Edit
            setEditPet={setEditPet}
            setState={setState}
            uuid={currentUUID}
          />
        )}
      </div>
    </Fragment>
  );
}
