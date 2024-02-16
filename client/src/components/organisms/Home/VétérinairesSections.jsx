import {
    ClockIcon,
    EyeIcon,
    HeartIcon,
    HomeIcon,
    ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
//translation
import { useTranslation } from "react-i18next";

export default function VétérinairesSection() {
    //translation
    const { t } = useTranslation();
    const features = [
        {
            description: `${t(
                "components.organisms.home.veterinaireSection.featureDescription1"
            )}`,
            icon: ClockIcon,
        },
        {
            description: `${t(
                "components.organisms.home.veterinaireSection.featureDescription2"
            )}`,
            icon: EyeIcon,
        },
        {
            description: `${t(
                "components.organisms.home.veterinaireSection.featureDescription3"
            )}`,
            icon: HeartIcon,
        },
        {
            description: `${t(
                "components.organisms.home.veterinaireSection.featureDescription4"
            )}`,
            icon: HomeIcon,
        },
    ];
    return (
        <div className="overflow-hidden bg-white py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pr-8 lg:pt-4">
                        <div className="lg:max-w-lg">
                            <h2 className="text-base font-semibold leading-7 text-indigo-600">
                                {t(
                                    "components.organisms.home.veterinaireSection.h2"
                                )}
                            </h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                {t(
                                    "components.organisms.home.veterinaireSection.p"
                                )}
                            </p>
                            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                {features.map((feature, index) => (
                                    <div key={index} className="relative pl-9">
                                        <dt className="inline font-semibold text-gray-900">
                                            <feature.icon
                                                className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                                                aria-hidden="true"
                                            />
                                        </dt>{" "}
                                        <dd className="inline">
                                            {feature.description}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
