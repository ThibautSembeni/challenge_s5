<?php

namespace App\EventListener;

use App\Entity\Clinics;
use App\Service\Geocoder;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Events;
use Doctrine\Persistence\Event\LifecycleEventArgs;

class ClinicsEventSubscriber implements EventSubscriber
{

    private Geocoder $geocoderService;

    public function __construct()
    {
        $this->geocoderService = new Geocoder();
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

    public function preUpdate(LifecycleEventArgs $args)
    {
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
}