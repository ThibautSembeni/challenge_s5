import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useTranslation } from "react-i18next";

import { createPayments } from "@/api/payments/Payments.jsx";
import { useNavigate } from "react-router-dom";
import NotificationToast from "@/components/atoms/Notifications/NotificationToast.jsx";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      // Vous pouvez ici envoyer le paymentMethod.id à votre serveur pour finaliser le paiement.
    }
  };

  return (
    <>
      <NotificationToast
        show={showNotificationToast}
        setShow={setShowNotificationToast}
        message={message}
        isSuccess={isSuccess}
      />

      <form onSubmit={handleSubmit}>
        <div className="p-4">
          <p className="mb-4">
            {t("components.organisms.payment.stripePayment.p")}
          </p>
          <CardElement />
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <button
            type="submit"
            disabled={!stripe}
            className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            {t("components.organisms.payment.stripePayment.button")}
          </button>
        </div>
      </form>
    </>
  );
};

const StripePayment = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default StripePayment;
