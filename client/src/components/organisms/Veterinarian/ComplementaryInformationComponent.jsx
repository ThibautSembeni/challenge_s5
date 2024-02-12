import React from 'react';
//translation
import { useTranslation } from "react-i18next";

function ComplementaryInformationComponent({ complementaryInformations }) {
    //translation
    const { t } = useTranslation();
  return (
    <div>
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 mb-4">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t("components.organisms.vetenarian.complementaryInformation.h2")}</h2>
        </div>
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {complementaryInformations.map((information) => (
            <div key={information.name}>
              <dt className="font-semibold text-gray-900">{information.name}</dt>
              <dd className="mt-1 text-gray-600">{information.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

export default ComplementaryInformationComponent;
