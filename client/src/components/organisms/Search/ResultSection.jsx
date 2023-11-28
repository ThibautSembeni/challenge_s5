import SideMap from "@/components/organisms/Search/Map.jsx";
import PracticienSection, {
  PracticienSectionSkeleton,
} from "@/components/organisms/Search/PracticienSection.jsx";
import { useEffect, useState } from "react";
import { getAllVeterinarians } from "@/api/veterinarians/index.jsx";
const veterinarians = [
  {
    "@id": "/api/veterinarians/3",
    "@type": "Veterinarians",
    lastname: "Sembeni",
    firstname: "Thibaut",
    email: "thibautsembeni@gmail.com",
    phone: "0768462492",
    specialties: "test",
    clinic: {
      "@id": "/api/clinics/1",
      "@type": "Clinics",
      name: "test",
      address: "20 rue des chaumonts, saulchery, 02310",
    },
  },
];

export default function ResultSection({ city }) {
  const [loading, setLoading] = useState(true);
  const [veterinarians, setVeterinarians] = useState([]);
  useEffect(() => {
    setLoading(true);
    getAllVeterinarians()
      .then((res) => {
        console.log(res);
        setVeterinarians(res.data);
      })
      .catch((err) => {
        setVeterinarians([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Vétérinaires à : <span className="text-blue-500">{city}</span>
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Trouvez à {city} un vétérinaire proposant la prise de rendez-vous en
          ligne
        </p>
        <p className="mt-2 text-lg leading-8 text-black">
          {veterinarians["hydra:totalItems"]} résultats
        </p>

        {loading ? (
          <PracticienSectionSkeleton />
        ) : (
          <div className="flex gap-4">
            <div className="mt-6 space-y-20 lg:mt-8 lg:space-y-20 w-full">
              {veterinarians["hydra:member"].map((veterinarian) => (
                <PracticienSection
                  info={veterinarian}
                  key={veterinarian["@id"]}
                />
              ))}
            </div>{" "}
            <SideMap className={"max-w-[30%]"} veterinarians={veterinarians} />
          </div>
        )}
      </div>
    </div>
  );
}
