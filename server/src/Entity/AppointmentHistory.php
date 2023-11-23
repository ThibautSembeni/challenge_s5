<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\AppointmentHistoryRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AppointmentHistoryRepository::class)]
#[ApiResource]
class AppointmentHistory
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'appointmentHistories')]
    private ?Appointments $appointmentID = null;

    #[ORM\ManyToOne(inversedBy: 'appointmentHistories')]
    private ?Veterinarians $veterinarianID = null;

    #[ORM\Column]
    private array $status = [];

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $datetime = null;

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

    public function getVeterinarianID(): ?Veterinarians
    {
        return $this->veterinarianID;
    }

    public function setVeterinarianID(?Veterinarians $veterinarianID): static
    {
        $this->veterinarianID = $veterinarianID;

        return $this;
    }

    public function getStatus(): array
    {
        return $this->status;
    }

    public function setStatus(array $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getDatetime(): ?\DateTimeInterface
    {
        return $this->datetime;
    }

    public function setDatetime(\DateTimeInterface $datetime): static
    {
        $this->datetime = $datetime;

        return $this;
    }
}
