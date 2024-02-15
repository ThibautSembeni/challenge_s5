import Input from "@/components/atoms/Inputs/Input.jsx";
import { Button } from "@/components/atoms/Buttons/Button.jsx";
import { useEffect, useState } from "react";
import { createVeterinarians } from "@/api/clinic/Veterinarian.jsx";
//translation
import { useTranslation } from "react-i18next";
export default function PracticienRegister() {
  //translation
  const { t } = useTranslation();
  const [form, setForm] = useState({});
  const inputs = [
    {
      type: "text",
      label: "Nom",
      required: true,
      name: "lastname",
    },
    {
      type: "text",
      label: "Prénom",
      required: true,
      name: "firstname",
    },
    {
      type: "tel",
      label: "Téléphone portable",
      required: true,
      name: "phone",
      className: "sm:col-span-2",
    },
    {
      type: "text",
      label: "Votre spécialité",
      required: true,
      name: "specialties",
      className: "sm:col-span-2",
    },
    {
      type: "email",
      label: "Adresse email",
      required: true,
      name: "email",
      className: "sm:col-span-2",
    },
  ];
  const canBeSubmitted = !areRequiredInputsFilled(form, inputs);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createVeterinarians(form)
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
  };

  function areRequiredInputsFilled(form, inputs) {
    for (let input of inputs) {
      if (input.required) {
        if (!form[input.name]) {
          return false;
        }
      }
    }
    return true;
  }

  return (
    <div className="isolate bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-blue-100 ring-1 ring-blue-900/10 lg:w-1/2"></div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {t("pages.praticienRegister.index.h2")}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t("pages.praticienRegister.index.p")}
            </p>
            <ul className="mt-10 space-y-4 text-base leading-7 text-gray-600">
              <li>{t("pages.praticienRegister.index.li1")}</li>
              <li>
                {" "}
                {t("pages.praticienRegister.index.li2")}
              </li>
              <li> {t("pages.praticienRegister.index.li3")}</li>
            </ul>
          </div>
        </div>
        <div className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <div className="relative grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              {inputs.map((input, index) => (
                <div key={input.name} className={input?.className}>
                  <Input
                    type={input.type}
                    label={input.label}
                    required={input?.required}
                    name={input.name}
                    onChange={handleChange}
                    value={form[input.name]}
                  />
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <Button
                size="m"
                color={"blue"}
                onClick={handleSubmit}
                disabled={canBeSubmitted}
              >
                {t("pages.praticienRegister.index.button")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
