<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\AppointmentServicesRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AppointmentServicesRepository::class)]
#[ApiResource]
class AppointmentServices
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'appointmentServices')]
    private ?Appointments $appointmentID = null;

    #[ORM\ManyToOne(inversedBy: 'appointmentServices')]
    private ?Services $serviceID = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAppointmentID(): ?Appointments
    {
        return $this->appointmentID;
    }

    public function setAppointmentID(?Appointments $appointmentID): static
    {
        $this->appointmentID = $appointmentID;

        return $this;
    }

    public function getServiceID(): ?Services
    {
        return $this->serviceID;
    }

    public function setServiceID(?Services $serviceID): static
    {
        $this->serviceID = $serviceID;

        return $this;
    }
}
