import React, {Fragment, useEffect, useState} from 'react'
import Navbar from "@/components/molecules/Navbar/index.jsx";
import Footer from "@/components/molecules/Footer/index.jsx";
import {useAuth} from "@/contexts/AuthContext.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import {createVeterinarians} from "@/api/veterinarian/index.jsx";
import Input from "@/components/atoms/Inputs/Input.jsx";
import {Button} from "@/components/atoms/Buttons/Button.jsx";
export default function Account() {
  const { user, isAuthenticated, isLoading } = useAuth();

  const [form, setForm] = useState({});
  const inputsInformation = [
    {
      type: "text",
      label: "Prénom",
      required: true,
      name: "firstname",
      className: 'col-span-full',
      value: user?.firstname,
    },
    {
      type: "text",
      label: "Nom",
      required: true,
      name: "lastname",
      className: 'col-span-full',
      value: user?.lastname,
    },
    {
      type: "email",
      label: "Email",
      required: true,
      name: "email",
      className: 'col-span-full',
      value: user?.email,
    },
    {
      type: "phone",
      label: "Téléphone",
      required: false,
      name: "phone",
      className: 'col-span-full',
      value: user?.phone,
    },
    {
      type: "text",
      label: "Adresse",
      required: false,
      name: "address",
      className: 'col-span-full',
      value: user?.address,
    },
  ];
  const canBeSubmitted = !areRequiredInputsFilled(form, inputsInformation);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    createVeterinarians(form)
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
  };

  function areRequiredInputsFilled(form, inputsInformation) {
    for (let input of inputsInformation) {
      if (input.required) {
        if (!form[input.name]) {
          return false;
        }
      }
    }
    return true;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />

      {isAuthenticated && (
        <main>
          {/* Settings forms */}
          <div className="divide-y">
            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 className="text-base font-semibold leading-7">Informations personnelles</h2>
              </div>

              <form className="md:col-span-2">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                  {inputsInformation.map((input, index) => (
                    <div key={input.name} className={input?.className}>
                      <Input
                        type={input.type}
                        label={input.label}
                        required={input?.required}
                        name={input.name}
                        value={input?.value}
                        onChange={handleChange}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex">
                  <Button
                    size="m"
                    color={'blue'}
                    onClick={handleSubmit}
                    disabled={canBeSubmitted}
                  >
                    Sauvegarder
                  </Button>
                </div>
              </form>
            </div>

            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 className="text-base font-semibold leading-7">Changement de mot de passe</h2>
              </div>

              <form className="md:col-span-2">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                  <div className="col-span-full">
                    <label htmlFor="current-password" className="block text-sm font-medium leading-6">
                      Mot de passe actuel
                    </label>
                    <div className="mt-2">
                      <input
                        id="current-password"
                        name="current_password"
                        type="password"
                        autoComplete="current-password"
                        className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="new-password" className="block text-sm font-medium leading-6">
                      Nouveau mot de passe
                    </label>
                    <div className="mt-2">
                      <input
                        id="new-password"
                        name="new_password"
                        type="password"
                        autoComplete="new-password"
                        className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="confirm-password" className="block text-sm font-medium leading-6">
                      Confirmer le nouveau mot de passe
                    </label>
                    <div className="mt-2">
                      <input
                        id="confirm-password"
                        name="confirm_password"
                        type="password"
                        autoComplete="new-password"
                        className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex">
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 text-white"
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            </div>

            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 className="text-base font-semibold leading-7">Supprimer mon compte</h2>
                <p className="mt-1 text-sm leading-6 text-gray-400">
                  Attention, cette action est irréversible.
                </p>
              </div>

              <form className="flex items-start md:col-span-2">
                <button
                  type="submit"
                  className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-red-400 text-white"
                >
                  Oui, je souhaite supprimer mon compte
                </button>
              </form>
            </div>
          </div>
        </main>
      )}

      <Footer />
    </>
  )
}
