<<<<<<< HEAD
import React from 'react';
//translation
import { useTranslation } from "react-i18next";

function ComplementaryInformationComponent({ complementaryInformations }) {
    //translation
    const { t } = useTranslation();
  return (
    <div>
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 mb-4">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t("components.organisms.vetenarian.complementaryInformation.h2")}</h2>
        </div>
=======
import React, {useState} from 'react';
import {TrashIcon} from "@heroicons/react/24/outline/index.js";
import NotificationToast from "@/components/atoms/Notifications/NotificationToast.jsx";
import {deleteComplementaryInformation} from "@/api/clinic/Clinic.jsx";

function ComplementaryInformationComponent({ complementaryInformationsProps, title = true, admin = false }) {
  const [complementaryInformations, setComplementaryInformations] = useState(complementaryInformationsProps);
  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [message, setMessage] = useState(null);

  const deleteComplementaryInformationByAdmin = async (id) => {
    const deleteItem = await deleteComplementaryInformation(id);

    if (deleteItem.success) {
      await setComplementaryInformations(prevInformations => {
        return prevInformations.filter(information => information.id !== id)
      });

      setIsSuccess(true);
      setMessage("Information supprimée avec succès");
      setShowNotificationToast(true);

      setTimeout(() => {
        setShowNotificationToast(false);
      }, 10000);
    } else {
      setIsSuccess(false);
      setMessage(deleteItem.message);
      setShowNotificationToast(true);

      setTimeout(() => {
        setShowNotificationToast(false);
      }, 10000);
    }
  }

  return (
    <div>
      <NotificationToast
        show={showNotificationToast}
        setShow={setShowNotificationToast}
        message={message}
        isSuccess={isSuccess}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {title && (
          <div className="mx-auto max-w-2xl lg:mx-0 mb-4">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Informations complémentaires</h2>
          </div>
        )}
>>>>>>> 7f26c2a86ec78aa2624cdda1aa6e433bb9bbe51b
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {complementaryInformations.map((information) => (
            <div key={information.name}>
              <dt className="font-semibold text-gray-900 flex gap-2">
                {admin && <TrashIcon className="w-4 font-bold text-red-500 hover:text-black hover:scale-110 duration-75 ease-in cursor-pointer" onClick={() => deleteComplementaryInformationByAdmin(information.id)} />}
                {information.name}
              </dt>
              <dd className="mt-1 text-gray-600">{information.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

export default ComplementaryInformationComponent;
