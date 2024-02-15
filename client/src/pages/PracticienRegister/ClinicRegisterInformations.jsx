import Navbar from "@/components/molecules/Navbar/index.jsx";
import Footer from "@/components/molecules/Footer/index.jsx";
import React, { useState } from "react";
import ProgressSteps from "@/components/organisms/Payment/ProgressSteps.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import { createClinics } from "@/api/clinic/Clinic.jsx";
import { useAuth } from "@/contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import NotificationToast from "@/components/atoms/Notifications/NotificationToast.jsx";
import {PhotoIcon} from "@heroicons/react/16/solid/index.js";

const steps = [
  {
    id: "Étape 1",
    name: "Informations sur le cabinet",
    href: "#",
    status: "complete",
  },
  { id: "Étape 2", name: "Paiement", href: "#", status: "upcoming" },
  { id: "Étape 3", name: "Récapitulatif", href: "#", status: "upcoming" },
];

export default function ClinicRegisterInformations() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData(e.currentTarget);

    const name = data.get("name");
    const phone = data.get("phone");
    const email = data.get("email");
    const address = data.get("address");
    const postalCode = data.get("postal_code");
    const city = data.get("city");
    const description = data.get("description");
    const file = data.get("file");
    const manager = `api/users/${user.uuid}`;

    const clinicResponse = await createClinics({
      name,
      phone,
      email,
      address,
      postalCode,
      city,
      description,
      manager,
      file
    });

    if (clinicResponse.success) {
      navigate("/inscription/cabinet/paiement");
    } else {
      setIsLoading(false);
      setIsSuccess(false);
      setMessage(clinicResponse.message);
      setShowNotificationToast(true);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Navbar />

          <NotificationToast
            show={showNotificationToast}
            setShow={setShowNotificationToast}
            message={message}
            isSuccess={isSuccess}
          />

          <div className="bg-gray-50">
            <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
              <h2 className="sr-only">Paiement</h2>

              <ProgressSteps steps={steps} />

              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Informations sur votre cabinet
                </h2>

                <div className="mb-20">
                  <div className="max-w-7xl gap-x-8 gap-y-10 mt-10">
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="col-span-full">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6"
                          >
                            Nom du cabinet
                          </label>
                          <div className="mt-2">
                            <input
                              id="name"
                              name="name"
                              type="text"
                              required={true}
                              className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6"
                          >
                            Email
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              name="email"
                              type="email"
                              required={true}
                              className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium leading-6"
                          >
                            Téléphone
                          </label>
                          <div className="mt-2">
                            <input
                              id="phone"
                              name="phone"
                              type="text"
                              required={true}
                              className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="address"
                            className="block text-sm font-medium leading-6"
                          >
                            Adresse postale
                          </label>
                          <div className="mt-2">
                            <input
                              id="address"
                              name="address"
                              type="text"
                              required={true}
                              className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="postal_code"
                            className="block text-sm font-medium leading-6"
                          >
                            Code postal
                          </label>
                          <div className="mt-2">
                            <input
                              id="postal_code"
                              name="postal_code"
                              type="text"
                              required={true}
                              className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium leading-6"
                          >
                            Ville
                          </label>
                          <div className="mt-2">
                            <input
                              id="city"
                              name="city"
                              type="text"
                              required={true}
                              className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium leading-6"
                          >
                            Description
                          </label>
                          <div className="mt-2">
                            <textarea
                              id="description"
                              name="description"
                              required={true}
                              className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-span-full mt-10">
                        <label htmlFor="kbis" className="block text-sm font-medium leading-6 text-gray-900">
                          Extrait Kbis
                        </label>
                        <div
                          className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                          <div className="text-center">
                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true"/>
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                              >
                                <span>Télécharger le ficher</span>
                                <input id="file-upload" name="file" type="file" className="sr-only" accept=".pdf,.jpg,.jpeg,.png"/>
                              </label>
                              <p className="pl-1">Ou glissez-déposez</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, PDF</p>
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
                </div>
              </div>
            </div>
          </div>

          <Footer/>
        </>
      )}
    </>
  );
}
