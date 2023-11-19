import React from "react";

export default function HeroSection() {
  return (
    <div className="bg-blue-500 text-white h-60 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Trouvez un vétérinaire</h1>
        <p className="text-md mb-6">
          Trouvez le meilleur vétérinaire pour vos animaux de compagnie.
        </p>
        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Entrez votre emplacement ou le nom du vétérinaire"
            className="w-full px-4 py-2 rounded-full border-none focus:outline-none"
          />
          <button className="bg-white text-blue-500 px-6 py-2 rounded-full mt-4 hover:bg-gray-200 transition duration-300">
            Rechercher
          </button>
        </div>
      </div>
    </div>
  );
}
