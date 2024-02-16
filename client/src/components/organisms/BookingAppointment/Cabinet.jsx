import Select from "@/components/atoms/Select/index.jsx";
import { useTranslation } from "react-i18next";

export default function Cabinet({ clinic }) {
  const { t } = useTranslation();
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Cabinet
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Choisissez le cabinet dans lequel vous souhaitez prendre
            rendez-vous.{" "}
          </p>
        </div>

        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
          <div className="sm:col-span-6">
            <Select
              type={"secondary-text"}
              label={"Choisissez un cabinet"}
              name={"clinic"}
              selected={clinic.uuid}
              list={[
                {
                  value: clinic.uuid,
                  primaryText: clinic.name,
                  secondaryText: `${clinic.address}, ${clinic.postalCode} ${clinic.city}`,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
