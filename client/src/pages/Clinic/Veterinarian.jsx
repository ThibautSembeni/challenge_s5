import Navbar from "@/components/molecules/Navbar/index.jsx";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Link, LinkBase } from "@/components/atoms/Links/Link.jsx";
import React, { useEffect, useState } from "react";
import { getOneVeterinarians } from "@/api/clinic/Veterinarian.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import imgDog from "@/assets/images/dogVeterinary.jpg";
import { Button } from "@/components/atoms/Buttons/Button.jsx";
import Footer from "@/components/molecules/Footer/index.jsx";
import MapInfo from "@/components/molecules/Map/MapInfo.jsx";
//translation
import { useTranslation } from "react-i18next";



export default function Veterinarian() {
  const { uuid } = useParams();
  const { isAuthenticated } = useAuth();
  //translation
    const { t } = useTranslation();


  const [veterinarian, setVeterinarian] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getOneVeterinarians(uuid)
      .then((veterinarianData) => {
        setVeterinarian(veterinarianData.data);

        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données : ", error);
        setIsLoading(false);
      });
  }, [uuid]);

  return (
    <>
      <Navbar />

      {isLoading ? (
        <Loading />
      ) : (
        <main className="isolate">
          {/* Hero section */}
          <div className="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
            <div
              className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
              aria-hidden="true"
            />
            <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
                <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto uppercase">
                  DR. {veterinarian.firstname} {veterinarian.lastname}
                </h1>
                <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                  <p className="text-lg leading-8 text-gray-600">
                    {veterinarian.specialties}
                  </p>
                  <div className="mt-4">

                    <LinkBase
                      component={RouterLink}
                      to={
                        isAuthenticated
                          ? `/booking-appointment/${uuid}`
                          : "/login"
                      }
                      className="rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                    >
                        {t("pages.clinic.vetenarian.buttonRDV")}
                    </LinkBase>

                  </div>
                </div>
                <img
                  src={imgDog}
                  alt="dog"
                  className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
                />
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
          </div>

          {/* Location section */}
          <div className="mx-auto mt-12 max-w-7xl px-6 lg:px-8 h-[50vh]">
            <div className="mx-auto max-w-2xl lg:mx-0 mb-4">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t("pages.clinic.vetenarian.h2")}
              </h2>
            </div>
            <div className="w-full flex border-2 border-gray-900/5 rounded-3xl">
              <div className="w-1/2 mx-6 flex py-6 flex items-start flex-col">
                <div className="flex items-center gap-x-4">
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <Link to={`/cabinet/${veterinarian.clinic.uuid}`}>
                        <span className="inset-0" />
                        {veterinarian.clinic.name}
                      </Link>
                    </p>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      {veterinarian.clinic.address}, {veterinarian.clinic.city},{" "}
                      {veterinarian.clinic.postalCode}
                    </p>
                  </div>
                </div>
                <div className={"mt-5 pt-2 border-t border-gray-900/5 w-full"}>
                  <p>Description :</p>{" "}
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    {veterinarian.clinic.description}
                  </p>
                </div>
              </div>
              <MapInfo
                geocode={[
                  veterinarian.clinic.latitude,
                  veterinarian.clinic.longitude,
                ]}
                zoom={15}
                className={"w-1/2 h-[40vh]"}
              />
            </div>
          </div>
        </main>
      )}

      <Footer />
    </>
  );
}
