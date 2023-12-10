import React, { useEffect, useState } from "react";
import { Button } from "@/components/atoms/Buttons/Button.jsx";
import Modal from "@/components/organisms/Modal/Modal.jsx";
import DeletationModal from "@/components/organisms/Modal/DeletationModal.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import { deleteUser } from "@/api/auth/index.jsx";
import { useAuth } from "@/contexts/AuthContext.jsx";

export default function DeleteAccount({ user }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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
        title={"Supprimer votre compte"}
        body={
          "Êtes-vous sûr de vouloir désactiver votre compte ? Toutes vos données seront définitivement supprimées. Cette action ne peut être annulée.\n"
        }
        cancelLabel={"Annuler"}
        submitLabel={"Supprimer"}
        deleteAction={handleDelete}
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

        <form className="flex items-start md:col-span-2" onSubmit={handleModal}>
          <button
            type="submit"
            className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-red-400 text-white"
          >
            Oui, je souhaite supprimer mon compte
          </button>
        </form>
      </div>
    </>
  );
}
