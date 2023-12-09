import React, { Fragment, useEffect, useState } from "react";
import Navbar from "@/components/molecules/Navbar/index.jsx";
import Footer from "@/components/molecules/Footer/index.jsx";
import { useAuth } from "@/contexts/AuthContext.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import {
  createVeterinarians,
  updateOneVeterinarians,
} from "@/api/veterinarian/index.jsx";
import Input from "@/components/atoms/Inputs/Input.jsx";
import { Button } from "@/components/atoms/Buttons/Button.jsx";
import { getUser, updateOneUsers } from "@/api/auth/index.jsx";
import UpdatePassword from "@/components/organisms/Account/UpdatePassword.jsx";
import UpdateUserInfo from "@/components/organisms/Account/UpdateUserInfo.jsx";
export default function Account() {
  const { user, isAuthenticated, isLoading } = useAuth();

  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const inputsInformation = [
    {
      type: "text",
      label: "Prénom",
      required: true,
      name: "firstname",
      className: "col-span-full",
      value: currentUser?.firstname,
      autoComplete: "given-name",
    },
    {
      type: "text",
      label: "Nom",
      required: true,
      name: "lastname",
      className: "col-span-full",
      value: currentUser?.lastname,
      autoComplete: "family-name",
    },
    {
      type: "email",
      label: "Email",
      required: true,
      name: "email",
      className: "col-span-full",
      value: currentUser?.email,
      autoComplete: "email",
    },
    {
      type: "phone",
      label: "Téléphone",
      required: false,
      name: "phone",
      className: "col-span-full",
      value: currentUser?.phone,
      autoComplete: "tel",
    },
    {
      type: "text",
      label: "Adresse",
      required: false,
      name: "address",
      className: "col-span-full",
      value: currentUser?.address,
      autoComplete: "street-address",
    },
    {
      type: "text",
      label: "Ville",
      required: false,
      name: "city",
      className: "col-span-full",
      value: currentUser?.city,
      autoComplete: "address-level2",
    },
    {
      type: "text",
      label: "Code Postal",
      required: false,
      name: "postalCode",
      className: "col-span-full",
      value: currentUser?.postalCode,
      autoComplete: "postal-code",
    },
  ];
  const [updatePasswordState, setUpdatePasswordState] = useState(null);

  const handleChange = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleGetUser = () => {
    getUser(user?.uuid)
      .then((r) => setCurrentUser(r.data))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  const handleUserDataSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const dataInfo = new FormData(e.target);
    const data = Object.fromEntries(dataInfo.entries());
    updateOneUsers(user.uuid, {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      postalCode: data.postalCode,
    })
      .then((r) => {
        setCurrentUser(r.data);
        setForm({});
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    setLoading(true);
    const dataInfo = new FormData(e.target);
    const data = Object.fromEntries(dataInfo.entries());
    if (data.new_password !== data.confirm_password) {
      return;
    }
    updateOneUsers(user.uuid, {
      newPassword: data.confirm_password,
      oldPassword: data.current_password,
    })
      .then((r) => {
        setCurrentUser(r.data);
        setForm({});
        setUpdatePasswordState({
          type: "success",
          message: "Votre mot de passe a bien été modifié",
        });
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user) handleGetUser();
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />

      {isAuthenticated && (
        <main>
          {/* Settings forms */}
          <div className="divide-y">
            <UpdateUserInfo
              onSubmit={handleUserDataSubmit}
              inputs={inputsInformation}
              disabledSubmit={!Object.keys(form).length > 0}
              onChange={handleChange}
            />
            <UpdatePassword
              onSubmit={handleUpdatePassword}
              additionnalInfo={updatePasswordState}
            />

            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 className="text-base font-semibold leading-7">
                  Supprimer mon compte
                </h2>
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
  );
}
