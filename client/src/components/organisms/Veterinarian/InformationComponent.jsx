import React from 'react';

function InformationComponent({ clinicDescription, informations }) {
  return (
    <div className="mx-auto mt-12 max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">À propos</h2>
        <div className="mt-6 flex flex-col gap-x-8 gap-y-20 xl:flex-row">
          <div className="xl:w-full xl:max-w-2xl xl:flex-auto">
            <p className="text-xl leading-8 text-gray-600">
              {clinicDescription}
            </p>
          </div>
          <div className="xl:flex xl:flex-auto xl:justify-center">
            <dl className="w-64 space-y-8 xl:w-80">
              {informations.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse gap-y-4">
                  <dt className="text-base leading-7 text-gray-600">{stat.label}</dt>
                  <dd className="text-5xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationComponent;
