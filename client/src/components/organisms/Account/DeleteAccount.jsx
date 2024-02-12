import React, { useEffect, useState } from "react";
import { Button } from "@/components/atoms/Buttons/Button.jsx";
import Modal from "@/components/organisms/Modal/Modal.jsx";
import DeletationModal from "@/components/organisms/Modal/DeletationModal.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import { deleteUser } from "@/api/auth/index.jsx";
import { useAuth } from "@/contexts/AuthContext.jsx";
//translation
import { useTranslation } from "react-i18next";

export default function DeleteAccount({ user }) {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  //translation
  const { t } = useTranslation();
  const handleModal = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleDelete = () => {
    setLoading(true);
    deleteUser(user.uuid)
      .then(async (res) => {
        console.log(res);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
      {loading && <Loading />}
      <DeletationModal
        open={open}
        setOpen={setOpen}
        title={t("components.organisms.account.deletedAccount.tilte")}
        body={
          t("components.organisms.account.deletedAccount.body")
        }
        cancelLabel={t("components.organisms.account.deletedAccount.annuler")}
        submitLabel={t("components.organisms.account.deletedAccount.supprimer")}
        deleteAction={handleDelete}
      />

      <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-base font-semibold leading-7">
              {t("components.organisms.account.deletedAccount.h2")}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
              {t("components.organisms.account.deletedAccount.p")}
          </p>
        </div>

        <form className="flex items-start md:col-span-2" onSubmit={handleModal}>
          <button
            type="submit"
            className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-red-400 text-white"
          >
            {t("components.organisms.account.deletedAccount.button")}
          </button>
        </form>
      </div>
    </>
  );
}
