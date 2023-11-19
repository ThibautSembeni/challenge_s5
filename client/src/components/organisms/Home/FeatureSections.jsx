import {
  CalendarIcon,
  ChatBubbleLeftEllipsisIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import VétérinairesSection from "@/components/organisms/Home/VétérinairesSections.jsx";

const features = [
  {
    name: "Prise de rendez-vous facile",
    description:
      "Planifiez rapidement des rendez-vous avec les vétérinaires de votre choix.",
    icon: CalendarIcon,
  },
  {
    name: "Suivi médical complet",
    description:
      "Gérez le suivi médical de vos animaux, y compris les rendez-vous, les traitements, et les informations de santé.",
    icon: ClipboardDocumentListIcon,
  },
  {
    name: "Communication facilitée",
    description:
      "Communiquez facilement avec les vétérinaires via la messagerie intégrée pour des échanges rapides et clairs.",
    icon: ChatBubbleLeftEllipsisIcon,
  },
];

export default function FeatureSections() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Appli nom: Au service de ceux qui vous sont chers
          </h2>
          <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name}>
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <VétérinairesSection />
    </div>
  );
}
