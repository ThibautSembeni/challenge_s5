import React, { Fragment, useEffect, useMemo, useState } from "react";
import Navbar from "@/components/molecules/Navbar/index.jsx";
import Footer from "@/components/molecules/Footer/index.jsx";
import { useAuth } from "@/contexts/AuthContext.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import {
  updateOneVeterinarians,
  createVeterinarians,
} from "@/api/clinic/Veterinarian.jsx";
import Input from "@/components/atoms/Inputs/Input.jsx";
import { Button } from "@/components/atoms/Buttons/Button.jsx";
import { getUser, updateOneUsers } from "@/api/auth/index.jsx";
import UpdatePassword from "@/components/organisms/Account/UpdatePassword.jsx";
import UpdateUserInfo from "@/components/organisms/Account/UpdateUserInfo.jsx";
import DeleteAccount from "@/components/organisms/Account/DeleteAccount.jsx";
export default function Account() {
  const { user, isAuthenticated, isLoading } = useAuth();

  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const inputsInformation = useMemo(
    () => [
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
    ],
    [currentUser],
  );
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

            <DeleteAccount user={user} />
          </div>
        </main>
      )}

      <Footer />
    </>
  );
}
