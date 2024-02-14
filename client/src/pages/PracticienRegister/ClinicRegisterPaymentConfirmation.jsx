import logo from "@/assets/images/logo.png";
import {Link} from "react-router-dom";

const products = [
  {
    id: 1,
    name: 'Abonnement à vie',
    description:
      'Licence VetCare pour une durée illimitée. Accès à toutes les fonctionnalités et mises à jour.',
    href: '#',
    quantity: 1,
    price: '349.00€',
    imageSrc: logo,
    imageAlt: 'Logo VetCare',
  },
]

export default function ClinicRegisterPaymentConfirmation() {
  return (
    <main className="bg-white px-4 pb-24 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="max-w-xl">
          <div className="mb-5">
            <Link to={"/"} className="bg-indigo-600 text-white px-3 py-1 rounded">Retour à l'accueil</Link>
          </div>

          <h1 className="text-base font-medium text-indigo-600">Merci pour votre achat !</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight">VetCare sera bientôt à vous !</p>
          <p className="mt-2 text-base text-gray-500">Une fois votre KBIS validé, vous recevrez un mail pour vous informer que votre compte est actif</p>
        </div>

        <section aria-labelledby="order-heading" className="mt-10 border-t border-gray-200">
          <h2 id="order-heading" className="sr-only">
            Votre achat
          </h2>

          <h3 className="sr-only">Produit</h3>
          {products.map((product) => (
            <div key={product.id} className="flex space-x-6 border-b border-gray-200 py-10">
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="h-20 w-20 flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-40 sm:w-40"
              />
              <div className="flex flex-auto flex-col">
                <div>
                  <h4 className="font-medium text-gray-900">
                    <a href={product.href}>{product.name}</a>
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">{product.description}</p>
                </div>
                <div className="mt-6 flex flex-1 items-end">
                  <dl className="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
                    <div className="flex">
                      <dt className="font-medium text-gray-900">Quantity</dt>
                      <dd className="ml-2 text-gray-700">{product.quantity}</dd>
                    </div>
                    <div className="flex pl-4 sm:pl-6">
                      <dt className="font-medium text-gray-900">Price</dt>
                      <dd className="ml-2 text-gray-700">{product.price}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          ))}

          <div className="sm:ml-40 sm:pl-6">
            <h3 className="sr-only">Résumé</h3>

            <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Total</dt>
                <dd className="text-gray-900">349.00€</dd>
              </div>
            </dl>
          </div>
        </section>
      </div>
    </main>
  )
}
