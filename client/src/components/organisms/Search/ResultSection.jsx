import SideMap from "@/components/organisms/Search/Map.jsx";
import PracticienSection, {
  PracticienSectionSkeleton,
} from "@/components/organisms/Search/PracticienSection.jsx";
import {
  Fragment,
  useEffect,
  useState,
  createRef,
  useCallback,
  useMemo,
} from "react";
import { getAllClinics } from "@/api/clinics/index.jsx";

export default function ResultSection({ city }) {
  const [loading, setLoading] = useState(true);
  const [clinics, setClinics] = useState([]);
  const [clinicId, setClinicId] = useState(null);
  const [selectedClinicId, setSelectedClinicId] = useState(null);

  const handleSelectWGS = (id) => {
    setClinicId(id);
  };

  const clinicRefs = useMemo(() => {
    if (clinics && clinics["hydra:member"]) {
      return clinics["hydra:member"].reduce((acc, clinic) => {
        acc[clinic["@id"]] = createRef();
        return acc;
      }, {});
    } else {
      return {};
    }
  }, [clinics]);

  useEffect(() => {
    setLoading(true);
    getAllClinics({ "city[custom_contain]": city })
      .then((res) => {
        setClinics(res.data);
      })
      .catch((err) => {
        setClinics([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [city]);

  useEffect(() => {
    if (selectedClinicId && clinicRefs[selectedClinicId].current) {
      clinicRefs[selectedClinicId].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedClinicId]);

  useEffect(() => {
    console.log(selectedClinicId);
  }, [selectedClinicId]);

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
          {clinics["hydra:totalItems"]} résultats
        </p>

        {loading ? (
          <PracticienSectionSkeleton />
        ) : (
          <div className="flex gap-4 relative">
            <div className="mt-6 space-y-3 lg:mt-8 w-2/4 overflow-y">
              {clinics["hydra:member"].length > 0 ? (
                clinics["hydra:member"].map((clinic) => (
                  <Fragment key={clinic["@id"]}>
                    {clinic.veterinarians.map((veterinarian) => (
                      <PracticienSection
                        ref={clinicRefs[clinic["@id"]]}
                        className={
                          selectedClinicId === clinic["@id"]
                            ? "shadow-2xl border-blue-400"
                            : ""
                        }
                        clinic={clinic}
                        veterinarian={veterinarian}
                        key={veterinarian["@id"]}
                        onMouseEnter={() => handleSelectWGS(clinic["@id"])}
                        onMouseLeave={() => handleSelectWGS(null)}
                      />
                    ))}
                  </Fragment>
                ))
              ) : (
                <div className="text-center text-gray-500">Aucun résultat</div>
              )}
            </div>{" "}
            <SideMap
              className={"w-2/4 sticky top-6"}
              clinics={clinics}
              selectedMarkerId={clinicId}
              setClinicId={setClinicId}
              onSelectMarker={setSelectedClinicId}
            />
          </div>
        )}
      </div>
    </div>
  );
}
