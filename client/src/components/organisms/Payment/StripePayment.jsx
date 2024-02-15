import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
const stripePromise = loadStripe('pk_test_51Kt9jqCaPgMXzB1GxtcgITeWvh9Z0o9DXQd6XoG5fHreEOIRWRR1FrFjYI50nTeSfG6TYDTiz2siAVc3r9gv8rEr00jWHdM6iC');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

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
      console.log('[PaymentMethod]', paymentMethod);
      // Vous pouvez ici envoyer le paymentMethod.id à votre serveur pour finaliser le paiement.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-4">
        <p className="mb-4">Paiement par carte bancaire</p>
        <CardElement />
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <button
          type="submit"
          disabled={!stripe}
          className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
        >
          Confirmer le paiement
        </button>
      </div>
    </form>
  );
};

const StripePayment = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default StripePayment;