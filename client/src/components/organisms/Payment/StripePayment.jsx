import React, {useState} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { useTranslation } from "react-i18next";

import {createPayments} from "@/api/payments/Payments.jsx";
import { useNavigate } from 'react-router-dom';
import NotificationToast from "@/components/atoms/Notifications/NotificationToast.jsx";


const stripePromise = loadStripe('pk_test_51Kt9jqCaPgMXzB1GxtcgITeWvh9Z0o9DXQd6XoG5fHreEOIRWRR1FrFjYI50nTeSfG6TYDTiz2siAVc3r9gv8rEr00jWHdM6iC');

const CheckoutForm = () => {
    const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()

  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      const response = await createPayments({
        paymentMethod
      })

      if (response.success) {
        navigate("/inscription/cabinet/confirmation");
      } else {
        setIsSuccess(false);
        setMessage("Erreur lors du paiement");
        setShowNotificationToast(true);
      }
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
          <p className="mb-4">{t("components.organisms.payment.stripePayment.p")}</p>
          <CardElement/>
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
    <CheckoutForm/>
  </Elements>
);

export default StripePayment;