import { createPets } from "@/api/pets/index.jsx";

export default function Add({ setAddPet, setState }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const dataInfo = new FormData(e.currentTarget);
    const data = Object.fromEntries(dataInfo.entries());
    createPets({
      name: data.name,
      species: data.species,
      breed: data.breed,
      birthdate: data.birthdate,
      medicalHistory: data.medicalHistory,
    })
      .then((res) => {
        if (res.status === 201) {
          setState({
            type: "success",
            title: "Votre animal a bien été ajouté",
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
        setAddPet(false);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Ajouter un animal
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Remplissez les champs ci-dessous pour ajouter un animal.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nom
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Garfield"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="species"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Espèce
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="species"
                    id="species"
                    autoComplete="species"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Chat"
                    required={true}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="breed"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Race
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="breed"
                    id="breed"
                    autoComplete="breed"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    required={true}
                  />
                </div>
              </div>
            </div>{" "}
            <div className="sm:col-span-4">
              <label
                htmlFor="birthdate"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Date de naissance
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="date"
                    name="birthdate"
                    id="birthdate"
                    autoComplete="birthdate"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    required={true}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="medicalHistory"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Antécédents médicaux
              </label>
              <div className="mt-2">
                <textarea
                  id="medicalHistory"
                  name="medicalHistory"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Rapide description des antécédents médicaux de votre animal.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={() => setAddPet(false)}
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
  );
}
