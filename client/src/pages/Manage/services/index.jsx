import List from "@/pages/Manage/services/list.jsx";
import {Fragment, useEffect, useState} from "react";
import Alert from "@/components/atoms/Alerts/index.jsx";
import Add from "@/pages/Manage/services/add.jsx";
import Edit from "@/pages/Manage/services/edit.jsx";
import {getAllServicesFromVeterinarian} from "@/api/services/index.jsx";

export default function MyServices() {
  const [services, setServices] = useState([]);
  const [state, setState] = useState({});
  const [addService, setAddService] = useState(false);
  const [editService, setEditService] = useState(false);
  const [currentUUID, setCurrentUUID] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleGetAllServices = async () => {
    setIsLoading(true);
    const result = await getAllServicesFromVeterinarian();
    if (result.status === 200) {
      setServices(result.data["hydra:member"]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetAllServices();
  }, []);

  useEffect(() => {
    if (state.type === "success") {
      handleGetAllServices();
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
        {!addService && !editService && (
          <List
            services={services}
            setAddService={setAddService}
            setEditService={setEditService}
            setCurrentUUID={setCurrentUUID}
            isLoading={isLoading}
          />
        )}
        {addService && !editService && (
          <Add setAddService={setAddService} setState={setState} />
        )}
        {!addService && editService && (
          <Edit
            setEditService={setEditService}
            setState={setState}
            uuid={currentUUID}
          />
        )}
      </div>
    </Fragment>
  );
}
