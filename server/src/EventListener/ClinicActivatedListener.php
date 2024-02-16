<?php

namespace App\EventListener;

use App\Event\ClinicActivatedEvent;
use Doctrine\ORM\EntityManagerInterface;

class ClinicActivatedListener
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function onClinicActivated(ClinicActivatedEvent $event): void
    {
        $clinic = $event->getClinic();
        $manager = $clinic->getManager();

        if ($manager && !in_array('ROLE_MANAGER', $manager->getRoles())) {
            $manager->setRoles(array_merge($manager->getRoles(), ['ROLE_MANAGER']));

            $this->entityManager->persist($manager);
            $this->entityManager->flush();
        }
    }
}
