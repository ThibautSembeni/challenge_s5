<?php

namespace App\EventListener;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\Appointments;
use App\Service\PushNotificationService;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

final class AppointmentNotificationEventSubscriber implements EventSubscriberInterface
{
    private PushNotificationService $notifier;

    public function __construct(PushNotificationService $notifier)
    {
        $this->notifier = $notifier;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['sendNotification', EventPriorities::POST_WRITE],
        ];
    }

    public function sendNotification(ViewEvent $event): void
    {
        $appointment = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$appointment instanceof Appointments || Request::METHOD_POST !== $method) {
            return;
        }
        setlocale(LC_TIME, 'fr_FR.UTF-8');
        $this->notifier->sendMessage(
            "Bonjour \n" . 'RDV ' . $appointment->getDate()->format('l d F \à H\h i') . ' avec ' . $appointment->getVeterinarian()->getFirstname() . ' ' . $appointment->getVeterinarian()->getLastname() . ' pour ' . $appointment->getPet()->getName() . " \n" . 'Motif: ' . $appointment->getService()->getDescription(),
            $appointment->getUserID()->getPhone()
        );
    }
}