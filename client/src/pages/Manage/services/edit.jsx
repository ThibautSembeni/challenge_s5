import { deletePets, getOnePets, updatePets } from "@/api/pets/index.jsx";
import { useEffect, useState } from "react";
import AlertModal from "@/components/atoms/Modals/AlertModal.jsx";
import {
  deleteServices,
  getOneService,
  updateServices,
} from "@/api/services/index.jsx";

export default function Edit({ setEditService, setState, uuid }) {
  const [services, setServices] = useState({});
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataInfo = new FormData(e.currentTarget);
    const data = Object.fromEntries(dataInfo.entries());
    updateServices(uuid, {
      description: data.description,
      price: data.price,
    })
      .then((res) => {
        if (res.status === 200) {
          setState({
            type: "success",
            title: "Votre service a bien été modifié",
          });
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        setState({
          type: "error",
          title: "Une erreur est survenue",
        });
      })
      .finally(() => {
        setEditService(false);
      });
  };

  const handleDelete = () => {
    deleteServices(uuid)
      .then((res) => {
        if (res.status === 204) {
          setState({
            type: "success",
            title: "Votre service a bien été supprimé",
          });
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        setState({
          type: "error",
          title: "Une erreur est survenue",
        });
      })
      .finally(() => {
        setEditService(false);
      });
  };

  const handleGetService = async () => {
    const result = await getOneService(uuid)
      .then((res) => {
        if (res.status === 200) {
          setServices(res.data);
        }
        return res;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleGetService();
  }, [uuid]);
  return (
    <>
      <AlertModal
        open={open}
        setOpen={setOpen}
        title={"Supprimez votre service"}
        content={
          "Êtes-vous sûr de vouloir supprimer votre service ? Cette action est irréversible."
        }
        actions={[
          {
            name: "Supprimer",
            onClick: () => {
              setOpen(false);
              handleDelete();
            },
            type: "primary",
          },
          {
            name: "Annuler",
            onClick: () => setOpen(false),
            type: "secondary",
          },
        ]}
      />

      <form onSubmit={handleSubmit}>
        {isLoading ? (
          <EditSkeleton />
        ) : (
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Modifier votre service
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Remplissez les champs ci-dessous pour modifier votre
                    service.
                  </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                  <button
                    type="button"
                    className="block rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    onClick={() => setOpen(true)}
                  >
                    Supprimer votre service
                  </button>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="description"
                        id="description"
                        autoComplete="description"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Consultation..."
                        defaultValue={services.description}
                        required={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Prix
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="number"
                        name="price"
                        id="price"
                        autoComplete="price"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="10"
                        required={true}
                        defaultValue={services.price}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => setEditService(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}

function EditSkeleton() {
  return (
    <div className="space-y-12 animate-pulse">
      <div className="border-b border-gray-900/10 pb-12">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h2 className="text-base font-semibold leading-7 bg-gray-400 h-4 rounded-md"></h2>
            <p className="mt-1 text-sm leading-6 bg-gray-400 h-4 rounded-md"></p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-gray-400 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm"
            ></button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 bg-gray-400 h-4 rounded-md"
            ></label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <div className="block flex-1 border-0 bg-gray-400 py-1.5 pl-1 h-4 rounded-md" />
              </div>
            </div>
          </div>
          <div className="sm:col-span-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium leading-6 bg-gray-400 h-4 rounded-md"
            ></label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <div className="block flex-1 border-0 bg-gray-400 py-1.5 pl-1 h-4 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
