import Input from "@/components/atoms/Inputs/Input.jsx";
import { Button } from "@/components/atoms/Buttons/Button.jsx";
import React from "react";
//translation
import { useTranslation } from "react-i18next";

export default function UpdateUserInfo({
  onSubmit,
  inputs,
  disabledSubmit,
  onChange,
}) {
  //translation
  const { t } = useTranslation();
  return (
    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <h2 className="text-base font-semibold leading-7">
          {t("components.organisms.account.updatedUserInfo.h2")}
        </h2>
      </div>

      <form className="md:col-span-2" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
          {inputs.map((input, index) => (
            <div key={input.name} className={input?.className}>
              <Input
                type={input.type}
                label={input.label}
                required={input?.required}
                name={input.name}
                value={input?.value}
                onChange={(e) => onChange(input.name, e.target.value)}
                autoComplete={input?.autoComplete || "off"}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 flex">
          <Button
            size="m"
            color={"blue"}
            btnType={"submit"}
            disabled={disabledSubmit}
          >
            {t("components.organisms.account.updatedUserInfo.button")}
          </Button>
        </div>
      </form>
    </div>
  );
}
