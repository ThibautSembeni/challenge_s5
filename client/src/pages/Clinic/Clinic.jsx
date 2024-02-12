import Navbar from "@/components/molecules/Navbar/index.jsx";
import React, { Fragment, useEffect, useState } from "react";
import imgBanner from "@/assets/images/veterinayBanner.jpg";
import { getOneClinics } from "@/api/clinic/Clinic.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import { Link, useParams } from "react-router-dom";
import Footer from "@/components/molecules/Footer/index.jsx";
import BannerComponent from "@/components/organisms/Veterinarian/BannerComponent.jsx";
import InformationComponent from "@/components/organisms/Veterinarian/InformationComponent.jsx";
import ComplementaryInformationComponent from "@/components/organisms/Veterinarian/ComplementaryInformationComponent.jsx";
import CalendarOpenCloseComponent from "@/components/organisms/Veterinarian/CalendarOpenCloseComponent.jsx";
import TeamSectionComponent from "@/components/organisms/Veterinarian/TeamSectionComponent.jsx";
import TestimonialsComponent from "@/components/organisms/Veterinarian/TestimonialsComponent.jsx";
import MapInfo from "@/components/molecules/Map/MapInfo.jsx";
//translation
import { useTranslation } from "react-i18next";

const featuredTestimonial = {
  body: "Integer id nunc sit semper purus. Bibendum at lacus ut arcu blandit montes vitae auctor libero. Hac condimentum dignissim nibh vulputate ut nunc. Amet nibh orci mi venenatis blandit vel et proin. Non hendrerit in vel ac diam.",
  author: {
    name: "Brenna Goyette",
    handle: "brennagoyette",
    imageUrl:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80",
    logoUrl: "https://tailwindui.com/img/logos/savvycal-logo-gray-900.svg",
  },
};
const testimonials = [
  [
    [
      {
        body: "Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil. Aut enim doloremque et ipsam.",
        author: {
          name: "Leslie Alexander",
          handle: "lesliealexander",
          imageUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
      // More testimonials...
    ],
    [
      {
        body: "Aut reprehenderit voluptatem eum asperiores beatae id. Iure molestiae ipsam ut officia rem nulla blanditiis.",
        author: {
          name: "Lindsay Walton",
          handle: "lindsaywalton",
          imageUrl:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
      // More testimonials...
    ],
  ],
  [
    [
      {
        body: "Voluptas quos itaque ipsam in voluptatem est. Iste eos blanditiis repudiandae. Earum deserunt enim molestiae ipsum perferendis recusandae saepe corrupti.",
        author: {
          name: "Tom Cook",
          handle: "tomcook",
          imageUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
      // More testimonials...
    ],
    [
      {
        body: "Molestias ea earum quos nostrum doloremque sed. Quaerat quasi aut velit incidunt excepturi rerum voluptatem minus harum.",
        author: {
          name: "Leonard Krasner",
          handle: "leonardkrasner",
          imageUrl:
            "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
      // More testimonials...
    ],
  ],
];
export default function ClinicProfil() {
  //translation
  const { t } = useTranslation();
  const { uuid } = useParams();
  const [clinicInfo, setClinicInfo] = useState({
    clinic: null,
    informations: [],
    complementaryInformations: [],
    teams: [],
    clinicSchedules: [],
    earliestStart: 24,
    latestEnd: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getOneClinics(uuid)
      .then((clinicData) => {
        const { data } = clinicData;
        setClinicInfo((prev) => ({
          ...prev,
          clinic: data,
          informations: [
            { label: "Numéro de téléphone", value: data.phone },
            { label: "Email", value: data.email },
            { label: "Avis client", value: "5/5 ##étoiles##" },
          ],
          complementaryInformations: data.clinicComplementaryInformation.map(
            ({ name, description }) => ({
              name,
              description,
            }),
          ),
          teams: data.veterinarians.map(
            ({ firstname, lastname, specialties, uuid }) => ({
              name: `${firstname} ${lastname}`,
              role: specialties,
              uuid,
              imageUrl:
                "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
            }),
          ),
          clinicSchedules: data.clinicSchedules.map((schedule) => ({
            day: schedule.day,
            startTime: new Date(schedule.timeslot_id.start_time),
            endTime: new Date(schedule.timeslot_id.end_time),
            isOpen: schedule.timeslot_id.isOpen,
          })),
        }));
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
        <main>
          <BannerComponent
            imgBanner={imgBanner}
            clinicName={clinicInfo.clinic?.name}
            clinicAddress={clinicInfo.clinic?.address}
          />

          <div className="isolate">
            <InformationComponent
              clinicDescription={clinicInfo.clinic?.description}
              informations={clinicInfo.informations}
            />

            {/* À changer par le composant map */}
            <div className="mx-auto mt-12 max-w-7xl px-6 lg:px-8 h-[50vh]">
              <div className="mx-auto max-w-2xl lg:mx-0 mb-4">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {t("pages.clinic.clinicFile.h2")}
                </h2>
              </div>
              <div className="w-full flex border-2 border-gray-900/5 rounded-3xl">
                <div className="w-1/2 mx-6 flex py-6 flex items-start flex-col">
                  <div className="flex items-center gap-x-4">
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        <span className="inset-0" />
                        {clinicInfo.clinic.name}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        {clinicInfo.clinic.address}, {clinicInfo.clinic.city},{" "}
                        {clinicInfo.clinic.postalCode}
                      </p>
                    </div>
                  </div>
                  <div
                    className={"mt-5 pt-2 border-t border-gray-900/5 w-full"}
                  >
                    <p>Description :</p>{" "}
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      {clinicInfo.clinic.description}
                    </p>
                  </div>
                </div>
                <MapInfo
                  geocode={[
                    clinicInfo.clinic.latitude,
                    clinicInfo.clinic.longitude,
                  ]}
                  zoom={15}
                  className={"w-1/2 h-[40vh]"}
                />
              </div>
            </div>

            {clinicInfo.complementaryInformations.length && (
              <ComplementaryInformationComponent
                complementaryInformations={clinicInfo.complementaryInformations}
              />
            )}

            <CalendarOpenCloseComponent
              clinicInformation={clinicInfo}
            />

            <TeamSectionComponent teamsProps={clinicInfo.teams} />

            <TestimonialsComponent
              featuredTestimonial={featuredTestimonial}
              testimonials={testimonials}
            />
          </div>
        </main>
      )}

      <Footer />
    </>
  );
}
