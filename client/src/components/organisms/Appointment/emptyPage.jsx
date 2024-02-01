import { PlusIcon } from "@heroicons/react/20/solid";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function EmptyPage() {
  return (
    <div className="text-center">
      <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">
        Aucun rendez-vous à venir
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Trouvez un practicien et prenez rendez-vous en ligne à tout moment
      </p>
      <div className="mt-6">
        <Link
          to={"/"}
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 uppercase"
        >
          <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          Prendre un rendez-vous
        </Link>
      </div>
    </div>
  );
}
