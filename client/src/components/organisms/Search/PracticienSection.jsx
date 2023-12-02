import { forwardRef } from "react";

const PracticienSection = forwardRef(
  ({ clinic, veterinarian, onMouseEnter, onMouseLeave, className }, ref) => {
    return (
      <article
        ref={ref}
        key={veterinarian["@id"]}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`relative isolate flex flex-col gap-8 lg:flex-row border-2 border-gray-900/5 rounded-xl p-4 hover:shadow-2xl hover:border-blue-400 ${className}`}
      >
        <div>
          <div className="mb-6 flex border-b border-gray-900/5 pb-6">
            <div className="relative flex items-center gap-x-4">
              <div className="text-sm leading-6">
                <p className="font-semibold text-gray-900">
                  <a href={veterinarian["@id"]}>
                    <span className="absolute inset-0" />
                    {veterinarian.lastname} {veterinarian.firstname}
                  </a>
                </p>
                <p className="text-gray-600">
                  Spécialité : {veterinarian.specialties}
                </p>
              </div>
            </div>
          </div>
          <div className="group relative max-w-xl">
            <p className="mt-5 text-sm leading-6 text-gray-600">
              {clinic.address}, {clinic.city}, {clinic.postalCode}
            </p>
          </div>
        </div>
      </article>
    );
  },
);

export default PracticienSection;
export function PracticienSectionSkeleton() {
  return (
    <article className="animate-pulse relative isolate flex flex-col gap-8 lg:flex-row border border-2 border-gray-900/5 rounded-xl p-4">
      <div role="status" className="max-w-sm animate-pulse">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </article>
  );
}
