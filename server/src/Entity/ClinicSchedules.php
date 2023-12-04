<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ClinicSchedulesRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ClinicSchedulesRepository::class)]
#[ApiResource]
class ClinicSchedules
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'clinicSchedules')]
    private ?Clinics $clinic_id = null;

    #[Groups(['clinics:read'])]
    #[ORM\ManyToOne(inversedBy: 'clinicSchedules')]
    private ?TimeSlots $timeslot_id = null;

    #[Groups(['clinics:read'])]
    #[ORM\Column(length: 20, nullable: true)]
    private ?string $day = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getClinicId(): ?Clinics
    {
        return $this->clinic_id;
    }

    public function setClinicId(?Clinics $clinic_id): static
    {
        $this->clinic_id = $clinic_id;

        return $this;
    }

    public function getTimeslotId(): ?TimeSlots
    {
        return $this->timeslot_id;
    }

    public function setTimeslotId(?TimeSlots $timeslot_id): static
    {
        $this->timeslot_id = $timeslot_id;

        return $this;
    }

    public function getDay(): ?string
    {
        return $this->day;
    }

    public function setDay(?string $day): static
    {
        $this->day = $day;

        return $this;
    }
}
