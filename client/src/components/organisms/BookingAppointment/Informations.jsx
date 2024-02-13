import Select from "@/components/atoms/Select/index.jsx";
import { getAllServices } from "@/api/services/index.jsx";
import { useEffect, useState } from "react";

export default function ComplémentsInformations({
  pets,
  currentSelectedPet,
  setCurrentSelectedPet,
}) {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Complément d'informations
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Choisissez l'animal consulté
          </p>
        </div>

        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
          <div className="sm:col-span-3">
            <Select
              type={"primary-text"}
              label={"Choisissez votre animal à consulter"}
              name={"complementInformations"}
              list={pets.map((pet) => ({
                content: pet.name,
                value: pet["@id"],
              }))}
              currentSelectedPet={currentSelectedPet}
              setCurrentSelectedPet={setCurrentSelectedPet}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function MotifSkeleton() {
  return (
    <div className="space-y-12 animate-pulse">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
        <div>
          <h2 className="text-base font-semibold leading-7 bg-gray-400 h-4"></h2>
          <p className="mt-1 text-sm leading-6 bg-gray-400 h-4 w-3/4"></p>
        </div>

        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
          <div className="sm:col-span-3">
            <div className="bg-gray-400 h-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
