import Navbar from "@/components/molecules/Navbar/index.jsx";
import Footer from "@/components/molecules/Footer/index.jsx";
import StripePayment from "@/components/organisms/Payment/StripePayment.jsx";
import logo from "@/assets/images/logo.png";
import React from "react";
import ProgressSteps from "@/components/organisms/Payment/ProgressSteps.jsx";

const products = [
  {
    id: 1,
    title: 'Abonnement à la plateforme',
    price: '349€',
    imageSrc: logo,
    imageAlt: "VetCare",
  },
]

const steps = [
  { id: 'Étape 1', name: 'Informations sur le cabinet', href: '#', status: 'complete' },
  { id: 'Étape 2', name: 'Paiement', href: '#', status: 'current' },
  { id: 'Étape 3', name: 'Récapitulatif', href: '#', status: 'upcoming' },
];

export default function ClinicRegisterPayment() {


  return (
    <>
      <Navbar />

      <div className="bg-gray-50">
        <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Paiement</h2>

          <ProgressSteps steps={steps} />

          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <div>

            </div>
            {/* Order summary */}
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900">Informations de paiement</h2>

              <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                <h3 className="sr-only">Information de votre panier</h3>
                <ul role="list" className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <li key={product.id} className="flex px-4 py-6 sm:px-6">
                      <div className="flex-shrink-0">
                        <img src={product.imageSrc} alt={product.imageAlt} className="w-20 rounded-md" />
                      </div>

                      <div className="ml-6 flex flex-1 flex-col">
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm">
                              <p className="font-medium text-gray-700 hover:text-gray-800">
                                {product.title}
                              </p>
                            </h4>
                          </div>
                        </div>

                        <div className="flex flex-1 items-end justify-between pt-2">
                          <p className="mt-1 text-sm font-medium text-gray-900">{product.price}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <StripePayment />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}