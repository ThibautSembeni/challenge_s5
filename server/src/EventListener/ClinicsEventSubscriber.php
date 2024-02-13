<?php

namespace App\EventListener;

use App\Entity\Clinics;
use App\Service\Geocoder;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\ORM\Events;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class ClinicsEventSubscriber implements EventSubscriber
{
    private MailerInterface $mailer;
    private Geocoder $geocoderService;

    public function __construct(MailerInterface $mailer)
    {
        $this->geocoderService = new Geocoder();
        $this->mailer = $mailer;
    }

    public function getSubscribedEvents()
    {
        return [
            Events::prePersist,
            Events::preUpdate,
        ];
    }

    public function prePersist(LifecycleEventArgs $args)
    {
        $this->handleEvent($args);
    }

    public function preUpdate(PreUpdateEventArgs $args)
    {
        $entity = $args->getObject();

        if ($entity instanceof Clinics && $args->hasChangedField('isActif')) {
            $oldValue = $args->getOldValue('isActif');
            $newValue = $args->getNewValue('isActif');

            if (!$oldValue && $newValue) {
                $this->sendEmail($entity);
            }
        }

        $this->handleEvent($args);
    }

    private function handleEvent(LifecycleEventArgs $args)
    {
        $entity = $args->getObject();
        $entityManager = $args->getObjectManager();

        if ($entity instanceof Clinics) {
            // Votre logique ici, par exemple :
            $this->processEntity($entity);
//            $entityManager->persist($entity);
//            $entityManager->flush();
        }
    }

    private function processEntity(Clinics $entity)
    {
        $address = $entity->getAddress();
        if (!empty($address)) {
            $coordinates = $this->geocoderService->getCoordinates($address);
            if (count($coordinates) === 2) {
                $entity->setLatitude($coordinates[0]);
                $entity->setLongitude($coordinates[1]);
            }

        }
    }

    /**
     * @throws TransportExceptionInterface
     */
    private function sendEmail(Clinics $clinics): void
    {
        $email = (new Email())
            ->from('confirmation@vetosia.fr')
            ->to($clinics->getEmail())
            ->subject('Profil confirmé !')
            ->text('Félécitations, votre profil a été confirmé ! Vous pouvez désormais vous connecter à votre espace personnel.');

        $this->mailer->send($email);
    }
}