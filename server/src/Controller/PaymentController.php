<?php

namespace App\Controller;

use App\Entity\Auth\User;
use App\Entity\Clinics;
use Doctrine\ORM\EntityManagerInterface;
use Stripe\PaymentIntent;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Stripe\Stripe;
use App\Entity\Payments;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class PaymentController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private MailerInterface $mailer;

    public function __construct(EntityManagerInterface $entityManager, MailerInterface $mailer)
    {
        $this->entityManager = $entityManager;
        $this->mailer = $mailer;
    }
    public function __invoke(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        $paymentMethodId = $data['paymentMethod']['id'];

        Stripe::setApiKey($_ENV['STRIPE_API_KEY']);

        try {
            $paymentIntent = PaymentIntent::create([
                'amount' => 34900,
                'currency' => 'eur',
                'payment_method' => $paymentMethodId,
                'confirmation_method' => 'manual',
                'confirm' => true,
                'return_url' => $_ENV['VITE_PUBLIC_API_URL'].'/validation-de-paiement',
            ]);

            $payment = new Payments();
            $payment->setStripePaymentID($paymentIntent->id);
            $payment->setAmount($paymentIntent->amount / 100);
            $payment->setStatus($paymentIntent->status);
            $payment->setPerson($this->getUser());

            $lastClinic = $this->entityManager->getRepository(Clinics::class)
                ->findBy(['manager' => $this->getUser()], ['createdAt' => 'DESC'], 1);

            if (!empty($lastClinic)) {
                $payment->setClinic(reset($lastClinic));
            }

            $this->entityManager->persist($payment);
            $this->entityManager->flush();

            $email = (new Email())
                ->from('confirmation@vetosia.fr')
                ->to($_ENV['ADMIN_EMAIL'])
                ->subject('Nouveau paiement')
                ->text('Un nouveau paiement a été effectué sur le site. Connectez-vous à votre espace admin pour plus de détails.');

            $this->mailer->send($email);

            return new Response(json_encode(['success' => true, 'paymentIntent' => $paymentIntent]), 200);
        } catch (\Exception $e) {
            return new Response(json_encode(['error' => $e->getMessage()]), 500);
        }
    }
}
