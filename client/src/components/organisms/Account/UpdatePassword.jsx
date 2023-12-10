import React, { useEffect, useState } from "react";
import { Button } from "@/components/atoms/Buttons/Button.jsx";

export default function UpdatePassword({ onSubmit, additionnalInfo }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  return (
    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <h2 className="text-base font-semibold leading-7">
          Changement de mot de passe
        </h2>
        {additionnalInfo && (
          <p
            className={`mt-1 text-sm text-gray-500 ${
              additionnalInfo.type === "success" && "text-green-500"
            } ${additionnalInfo.type === "error" && "text-red-500"}`}
          >
            {additionnalInfo.message}
          </p>
        )}
        {newPassword !== "" &&
          newPasswordConfirm !== "" &&
          newPassword !== newPasswordConfirm && (
            <p className="mt-1 text-sm text-red-500">
              Les mots de passe ne correspondent pas
            </p>
          )}
      </div>

      <form className="md:col-span-2" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="current-password"
              className="block text-sm font-medium leading-6"
            >
              Mot de passe actuel
            </label>
            <div className="mt-2">
              <input
                id="current-password"
                name="current_password"
                type="password"
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="new-password"
              className="block text-sm font-medium leading-6"
            >
              Nouveau mot de passe
            </label>
            <div className="mt-2">
              <input
                id="new-password"
                name="new_password"
                type="password"
                autoComplete="new-password"
                className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium leading-6"
            >
              Confirmer le nouveau mot de passe
            </label>
            <div className="mt-2">
              <input
                id="confirm-password"
                name="confirm_password"
                type="password"
                autoComplete="new-password"
                className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex">
          <Button
            size="m"
            color={"blue"}
            btnType={"submit"}
            disabled={
              currentPassword === "" ||
              newPassword === "" ||
              newPasswordConfirm === "" ||
              newPassword !== newPasswordConfirm
            }
          >
            Enregistrer
          </Button>
        </div>
      </form>
    </div>
  );
}
