import logo from "@/assets/images/logo.png";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

export default function Footer() {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const navigation = useMemo(() => {
    return {
      solutions: [
        { name: `${t("footer.solutions.analitycs")}`, href: "#" },
        { name: `${t("footer.solutions.commerce")}`, href: "#" },
        { name: `${t("footer.solutions.insight")}`, href: "#" },
      ],
      support: [
        { name: `${t("footer.support.pricing")}`, href: "#" },
        { name: `${t("footer.support.Documentation")}`, href: "#" },
        { name: `${t("footer.support.Guides")}`, href: "#" },
        { name: `${t("footer.support.ApiSatus")}`, href: "#" },
      ],
      company: [
        { name: `${t("footer.company.about")}`, href: "#" },
        { name: `${t("footer.company.blog")}`, href: "#" },
        { name: `${t("footer.company.jobs")}`, href: "#" },
        { name: `${t("footer.company.press")}`, href: "#" },
        { name: `${t("footer.company.partners")}`, href: "#" },
      ],
      legal: [
        { name: `${t("footer.legal.claim")}`, href: "#" },
        { name: `${t("footer.legal.privacy")}`, href: "#" },
        { name: `${t("footer.legal.terms")}`, href: "#" },
      ],
    };
  }, [language]);

  return (
    <footer className="bg-white mt-10" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        {" "}
        {t("footer.Footer.h2")}
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-6 lg:px-8 ">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <img className="h-12" src={logo} alt="VetCare" />
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  Solutions
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  Support
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  {t("footer.Company.h3")}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  Legal
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 xl:mt-0">
          <h3 className="text-base font-medium text-gray-900">
            {t("footer.language.title.level3")}
          </h3>
          <div className="mt-4 sm:max-w-xs">
            <fieldset className="w-full">
              <label htmlFor="language" className="sr-only">
                {t("footer.language.title.level3")}
              </label>
              <div className="relative">
                <select
                  id="language"
                  name="language"
                  className="block w-full appearance-none rounded-md border border-gray-300 bg-white bg-none py-2 pl-3 pr-10 text-base text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  defaultValue={language}
                  onChange={(e) => {
                    changeLanguage(e.target.value);
                  }}
                >
                  <option value={"en"}>{t("footer.language.values.en")}</option>
                  <option value={"fr"}>{t("footer.language.values.fr")}</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                  <ChevronDownIcon
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </footer>
  );
}
