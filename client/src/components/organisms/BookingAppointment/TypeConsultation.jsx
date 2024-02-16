import Select from "@/components/atoms/Select/index.jsx";
import { CameraIcon, HomeModernIcon } from "@heroicons/react/20/solid/index.js";
import { HomeIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

export default function TypeConsultation({
  handleVideoAppointment,
  handleClinicAppointment,
}) {
  const { t } = useTranslation();
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Type de consultation
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Choisissez si vous souhaitez consulter en cabinet ou réaliser une
            consultation vidéo.
          </p>
        </div>

        <div className="flex items-center max-w-2xl gap-x-6 gap-y-8 md:col-span-2">
          <div className="sm:col-span-3 inline-flex gap-2">
            {/*<button*/}
            {/*  type="button"*/}
            {/*  className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"*/}
            {/*  onClick={handleVideoAppointment}*/}
            {/*>*/}
            {/*  <CameraIcon*/}
            {/*    className="-ml-0.5 h-5 w-5 uppercase"*/}
            {/*    aria-hidden="true"*/}
            {/*  />*/}
            {/*  Rendez-vous en vidéo*/}
            {/*</button>*/}

            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleClinicAppointment}
            >
              <HomeIcon
                className="-ml-0.5 h-5 w-5 uppercase"
                aria-hidden="true"
              />
              Rendez-vous au cabinet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
